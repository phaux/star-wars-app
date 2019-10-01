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
  if (el.animate == null) return
  el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, delay: 250, fill: "forwards" })
}

export async function fadeOut(el: HTMLElement, idx: number, end: () => void) {
  if (el.animate == null) return end()
  const animation = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250 })
  if (animation.finished != null) {
    await animation.finished
  }
  if (animation.onfinish != null) {
    await new Promise(resolve => animation.addEventListener("finish", resolve))
  }
  end()
}
