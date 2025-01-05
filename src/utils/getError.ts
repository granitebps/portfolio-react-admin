export type ValidationErrorType = {
  field: string
  message: string
}

export type ErrorResponseType = {
  [key: string]: any
  server?: string
}

export const getError = (e: any): ErrorResponseType | null => {
  if (e?.status == 422) {
    const result: Record<string, string> = {}

    e?.response?.data?.data.forEach((item: ValidationErrorType) => {
      result[item.field] = item.message
    })

    return result
  } else {
    return {
      server: e?.response?.data?.data?.message || e?.message || 'Something went wrong!'
    }
  }
}
