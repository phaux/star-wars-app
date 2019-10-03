import { AppBar, Container, Tab, Tabs, Box, Typography } from "@material-ui/core"
import * as React from "react"
import { useHistory, useParams } from "react-router-dom"
import SwipeableViews from "react-swipeable-views"
import { PeopleScreen } from "./screens/people/PeopleScreen"
import { StarshipsScreen } from "./screens/starships/StarshipsScreen"

const SCREENS = ["people", "starships"] as const

export const AppScreen: React.FC = () => {
  const params = useParams<{ screen: string }>()
  const history = useHistory()

  return (
    <>
      <AppBar position="sticky" color="default">
        <Tabs
          value={params.screen != null ? params.screen : false}
          onChange={(ev, screen) => history.push(`/${screen}`)}
          centered
        >
          <Tab value="people" label="👤 People" />
          <Tab value="starships" label="🚀 Starships" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        index={SCREENS.indexOf(params.screen as any) + 1}
        onChangeIndex={(ev, idx) => history.push(`/${SCREENS[idx]}`)}
      >
        <Box clone py={6}>
          <Typography variant="h4" color="textSecondary" align="center">
            Select game mode
          </Typography>
        </Box>
        <Box overflow="hidden">
          <Container maxWidth="md">
            <PeopleScreen />
          </Container>
        </Box>
        <Box overflow="hidden">
          <Container maxWidth="md">
            <StarshipsScreen />
          </Container>
        </Box>
      </SwipeableViews>
    </>
  )
}
