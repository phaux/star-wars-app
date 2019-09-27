import { AppBar, Container, Tab, Tabs } from "@material-ui/core"
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
        <Tabs value={params.screen} onChange={(ev, screen) => history.push(`/${screen}`)} centered>
          <Tab value="people" label="👤 People" />
          <Tab value="starships" label="🚀 Starships" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        index={SCREENS.indexOf(params.screen as any)}
        onChangeIndex={(ev, idx) => history.push(`/${SCREENS[idx]}`)}
      >
        <div>
          <Container maxWidth="md">
            <PeopleScreen />
          </Container>
        </div>
        <div>
          <Container maxWidth="md">
            <StarshipsScreen />
          </Container>
        </div>
      </SwipeableViews>
    </>
  )
}
