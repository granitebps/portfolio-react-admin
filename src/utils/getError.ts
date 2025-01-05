export type ValidationErrorType = {
  field: string
  message: string
}

export type ErrorResponseType = {
  [key: string]: any
  server?: string
}

export const getError = (e: any): ErrorResponseType | null => {
  let errorResData = e?.response?.data

  if (e?.error) {
    errorResData = JSON.parse(e.error)
  }

  if (e?.status == 422) {
    const result: Record<string, string> = {}

    errorResData?.data.forEach((item: ValidationErrorType) => {
      result[item.field] = item.message
    })

    return result
  } else {
    return {
      server: errorResData?.message || e?.message || 'Something went wrong!'
    }
  }
}
