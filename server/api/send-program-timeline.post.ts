import { readFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import puppeteer from 'puppeteer'
import { Resend } from 'resend'

interface RsvpRow {
  row: number
  name: string
  email: string
  seats: number
  attending: string
  sentEmail: string
}

interface SheetResponse {
  success: boolean
  data?: RsvpRow[]
  error?: string
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const googleSheetUrl = config.public.googleSheetUrl

  if (!googleSheetUrl) {
    throw createError({ statusCode: 500, statusMessage: 'Google Sheet URL not configured' })
  }
  if (!config.resendApiKey) {
    throw createError({ statusCode: 500, statusMessage: 'RESEND_API_KEY not configured' })
  }

  const sheetResponse = await $fetch<SheetResponse>(googleSheetUrl, {
    method: 'GET',
    params: { action: 'getPendingConfirmations' },
  })
  console.log('Sheet rows:', JSON.stringify(sheetResponse.data))
  if (!sheetResponse.success || !sheetResponse.data?.length) {
    return { success: true, message: 'No pending program timeline emails to send', sent: 0 }
  }

  const templatePath = resolve('emails/program-timeline.html')
  const template = readFileSync(templatePath, 'utf-8')

  const resend = new Resend(config.resendApiKey)
  const replyTo = config.mailReplyTo || undefined

  const results: { name: string; email: string; status: 'sent' | 'failed'; error?: string }[] = []

  const screenshotDir = resolve('screenshots/program-timeline')
  mkdirSync(screenshotDir, { recursive: true })
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })

  for (const row of sheetResponse.data) {
    const toTitleCase = (w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    const parts = row.name.split(' ').filter(Boolean).map(toTitleCase)
    const isInitial = (w: string) => /^[A-Za-z]\.?$/.test(w)
    const firstName = parts.length > 2 && !isInitial(parts[1])
      ? `${parts[0]} ${parts[1]}`
      : parts[0]
    const html = template
      .replace(/\{\{NAME\}\}/g, firstName)
      .replace(/\{\{SEATS\}\}/g, String(row.seats))

    const text = `Kumusta ${firstName},

Narito ang takbo ng okasyon para sa kasal nina Dan & Jane sa Mayo 16, 2026:

SEREMONYA — San Ezekiel Moreno Oratory
2:00 PM — Pagdating sa Simbahan
2:30 PM — Paghahanda ng Entourage March
3:00 PM — Seremonya ng Kasal
4:00 PM — Post-Nuptial na Larawan
4:30 PM — Pagpunta sa Resepsyon

RESEPSYON — Villar Sipag Events Place
5:15 PM — 2nd Look & Preshow (pica-pica, photobooth, mga laro)
5:45 PM — Unang Bahagi ng Programa (traditional dances, cutting of cake, toasting, dove release)
6:15 PM — Hapunan at Pagkuha ng Larawan
6:45 PM — Pangalawang Bahagi ng Programa (mga laro)
7:15 PM — STD & SDE Showing
7:30 PM — Pagtatapos na Mensahe
8:00 PM — Wakas ng Programa

PAALALA: Please note that this timeline will just be our guide on your big day. Pwede pong mas maging mas maaga ang shoots or same ng nasa timeline since magbabase parin po tayo sa mangyayari on the day though minor changes lang naman po sya. Thank you for understanding po. You can also send this to your entourage and family para idea po sila sa magiging flow ng ating araw. Salamat po ulit couple.

Para sa karagdagang detalye, bisitahin ang ${config.rsvpUrl}.

Salamat,
Dan & Jane`

    const unsubscribeAddress = replyTo || 'rsvp@dan-jane-wedding.com'

    try {
      const { data, error } = await resend.emails.send({
        from: config.mailFrom,
        to: [row.email],
        replyTo,
        subject: `Takbo ng Okasyon — Dan & Jane Wedding`,
        html,
        text,
        headers: {
          'List-Unsubscribe': `<mailto:${unsubscribeAddress}?subject=unsubscribe>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
          'X-Entity-Ref-ID': `program-${row.row}-${Date.now()}`,
        },
      })

      if (error) {
        throw new Error(error.message || 'Resend API error')
      }
      console.log(`Sent program timeline to ${row.email} (id: ${data?.id})`)

      await $fetch(googleSheetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'markConfirmationSent', row: row.row }),
      })

      results.push({ name: row.name, email: row.email, status: 'sent' })
    }
    catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      results.push({ name: row.name, email: row.email, status: 'failed', error: message })
      continue
    }

    try {
      const page = await browser.newPage()
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 })
      await page.setContent(html, { waitUntil: 'networkidle2' })
      const container = await page.$('.email-container')
      const safeName = row.name.trim().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase()
      const screenshotPath = resolve(`screenshots/program-timeline/${safeName}.png`)
      await container!.screenshot({ path: screenshotPath })
      await page.close()
    }
    catch (screenshotErr) {
      console.error(`Screenshot failed for ${firstName}:`, screenshotErr)
    }
  }

  await browser.close()

  const sent = results.filter(r => r.status === 'sent').length
  const failed = results.filter(r => r.status === 'failed').length

  return { success: true, sent, failed, results }
})
