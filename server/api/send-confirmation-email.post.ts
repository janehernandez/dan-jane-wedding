import { createTransport } from 'nodemailer'
import { readFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import puppeteer from 'puppeteer'

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

  // 1. Fetch pending rows from Google Apps Script (Sent Email = blank or "no")
  const sheetResponse = await $fetch<SheetResponse>(googleSheetUrl, {
    method: 'GET',
    params: { action: 'getPendingConfirmations' },
  })
 console.log('Sheet rows:', JSON.stringify(sheetResponse.data))
  if (!sheetResponse.success || !sheetResponse.data?.length) {
    return { success: true, message: 'No pending confirmations to send', sent: 0 }
  }

  if (!sheetResponse.data.length) {
    return { success: true, message: 'No attending confirmations to send', sent: 0 }
  }

  // 2. Load email template
  const templatePath = resolve('emails/rsvp-template.html')
  const template = readFileSync(templatePath, 'utf-8')

  // 3. Set up SMTP transport
  const transporter = createTransport({
    host: process.env.NUXT_MAIL_SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.NUXT_MAIL_SMTP_PORT) || 587,
    auth: {
      user: process.env.NUXT_MAIL_SMTP_USER || '',
      pass: process.env.NUXT_MAIL_SMTP_PASS || '',
    },
  })

  // 4. Send emails and track results
  const results: { name: string; email: string; status: 'sent' | 'failed'; error?: string }[] = []

  const screenshotDir = resolve('screenshots')
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

    try {
      await transporter.sendMail({
        from: config.mailFrom,
        to: row.email,
        subject: `Kumpirmasyon ng RSVP — ${firstName} | Dan & Jane Wedding`,
        html,
      })

      // 5. Mark as sent in Google Sheet
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

    // Generate screenshot only after successful send + mark
    try {
      const page = await browser.newPage()
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 })
      await page.setContent(html, { waitUntil: 'networkidle2' })
      const container = await page.$('.email-container')
      const safeName = row.name.trim().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase()
      const screenshotPath = resolve(`screenshots/${safeName}.png`)
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
