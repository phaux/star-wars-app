import * as React from "react"

const API_URL = "https://swapi.co/api/"

export type ApiRequest<T> =
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "ready"; data: ApiResponse<T> }

export interface ApiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export function useApi<T>(endpoint: string, query?: Record<string, string>): ApiRequest<T> {
  const [response, setResponse] = React.useState<ApiRequest<T>>({ status: "loading" })

  const url = new URL(endpoint, API_URL)
  if (query != null) url.search = "?" + new URLSearchParams(query).toString()

  React.useEffect(() => {
    fetch(url.href, { mode: "cors" })
      .then(res => res.json())
      .then(data => setResponse({ status: "ready", data }))
      .catch(error => setResponse({ status: "error", error }))
  }, [])

  return response
}
