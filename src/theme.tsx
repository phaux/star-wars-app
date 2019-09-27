import { createMuiTheme } from "@material-ui/core"
import { pink, yellow } from "@material-ui/core/colors"

export const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: yellow,
    secondary: pink,
  },
})
