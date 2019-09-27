import { Box } from "@material-ui/core"
import { BoxProps } from "@material-ui/core/Box"
import * as React from "react"
import { Flipped } from "react-flip-toolkit"

/**
 * `Flipped` component wrapping a `Box` with appear and exit animations
 */
export const FlipBox: React.FC<{ flipId: string } & BoxProps> = props => {
  const { flipId, ...boxProps } = props
  return (
    <Flipped flipId={flipId} onAppear={fadeIn} onExit={fadeOut}>
      <Box {...boxProps}>{props.children}</Box>
    </Flipped>
  )
}

export function fadeIn(el: HTMLElement) {
  el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, delay: 250, fill: "forwards" })
}

export function fadeOut(el: HTMLElement, idx: number, end: () => void) {
  el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250 })
    .finished.then(end)
    .catch(() => {})
}
