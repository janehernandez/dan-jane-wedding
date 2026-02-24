interface RsvpForm {
  name: string
  phone: string
  email: string
  attending: string
  message: string
}

interface SheetResponse {
  success: boolean
  error?: string
  duplicate?: boolean
  duplicateField?: 'name' | 'email'
}

export function useRsvp() {
  const config = useRuntimeConfig()
  const isSubmitting = ref(false)
  const isSuccess = ref(false)
  const error = ref<string | null>(null)
  const isDuplicate = ref(false)
  const duplicateField = ref<'name' | 'email' | null>(null)

  const submitRsvp = async (form: RsvpForm) => {
    isSubmitting.value = true
    error.value = null
    isSuccess.value = false
    isDuplicate.value = false
    duplicateField.value = null

    try {
      const scriptUrl = config.public.googleSheetUrl

      if (!scriptUrl) {
        throw new Error('Google Sheet URL not configured')
      }

      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toISOString(),
        }),
      })

      const result: SheetResponse = await response.json()

      if (result.duplicate) {
        isDuplicate.value = true
        duplicateField.value = result.duplicateField || 'name'
        if (result.duplicateField === 'email') {
          error.value = 'Ang email na ito ay nagamit na sa ibang RSVP.'
        }
        else {
          error.value = 'Naka-RSVP na ang pangalang ito. Kung kailangan mong baguhin ang iyong sagot, mangyaring makipag-ugnayan sa amin.'
        }
        return false
      }

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit RSVP')
      }

      isSuccess.value = true
      return true
    }
    catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to submit RSVP'
      return false
    }
    finally {
      isSubmitting.value = false
    }
  }

  const resetState = () => {
    isSuccess.value = false
    error.value = null
    isDuplicate.value = false
    duplicateField.value = null
  }

  return {
    isSubmitting,
    isSuccess,
    error,
    isDuplicate,
    duplicateField,
    submitRsvp,
    resetState,
  }
}
