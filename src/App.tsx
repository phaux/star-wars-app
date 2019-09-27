import { CssBaseline } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/styles"
import * as React from "react"
import { IntlProvider } from "react-intl"
import { BrowserRouter, Route } from "react-router-dom"
import { AppScreen } from "./AppScreen"
import { theme } from "./theme"

export const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <IntlProvider locale="en">
      <BrowserRouter>
        <Route path="/:screen?" component={AppScreen} />
      </BrowserRouter>
    </IntlProvider>
  </ThemeProvider>
)
