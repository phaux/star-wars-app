import * as React from "react"
import { CircularProgress, Box, Typography } from "@material-ui/core"
import { ApiRequest, ApiResponse } from "../state/useApi"

interface FallbackProps<T> {
  request: ApiRequest<T>
  children: (data: ApiResponse<T>) => React.ReactNode
}

export function Fallback<T>(props: FallbackProps<T>) {
  if (props.request.status === "loading") {
    return (
      <Box my={8} textAlign="center">
        <CircularProgress />
      </Box>
    )
  }

  if (props.request.status === "error") {
    return (
      <Box my={4} textAlign="center">
        <Typography component="p" variant="h5">
          Something went wrong:
          <br />
          {props.request.error.message}
        </Typography>
      </Box>
    )
  }

  return <>{props.children(props.request.data)}</>
}
