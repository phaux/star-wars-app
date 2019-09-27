import { Box, Button, Grid, Typography } from "@material-ui/core"
import * as React from "react"
import { Flipped, Flipper } from "react-flip-toolkit"
import { FlipBox } from "./FlipBox"

interface BoardProps<T extends WithId> {
  component: React.ComponentType<BoardItemProps<T>>
  data: T[]
  compare: (item1: T, item2: T) => number
}

export interface BoardItemProps<T extends WithId> {
  item: T
  onSelect?: () => void
  selected: boolean
  color?: "primary" | "secondary"
}

export interface WithId {
  url: string
}

export function Board<T extends WithId>(props: BoardProps<T>) {
  const [selectedItems, setSelectedItems] = React.useState<T[]>([])

  // Scroll to top when card is selected
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [selectedItems])

  const addToSelection = (item: T) => () => {
    if (selectedItems.some(selected => selected.url === item.url)) return
    setSelectedItems([...selectedItems, item])
  }

  const items = props.data.filter(
    item => !selectedItems.some(selected => selected.url === item.url),
  )

  return (
    <Flipper
      spring="veryGentle"
      flipKey={
        items.map(item => item.url).join(",") + ":" + selectedItems.map(item => item.url).join(",")
      }
    >
      <Box my={2}>
        <Grid container justify="center" spacing={2}>
          {selectedItems.map((item, idx) => (
            <Grid item key={item.url} xs={12} sm={6} md={4}>
              <Flipped flipId={item.url} stagger>
                <Box zIndex={10}>
                  <props.component
                    item={item}
                    selected={true}
                    color={idx === 0 ? "primary" : "secondary"}
                  />
                </Box>
              </Flipped>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Flipped flipId="message-box">
        <Flipper flipKey={selectedItems.length}>
          <Box my={4}>
            {selectedItems.length === 0 && (
              <FlipBox flipId="step1" my={2}>
                <Typography component="p" color="primary" variant="h3" align="center">
                  Select your card
                </Typography>
              </FlipBox>
            )}
            {selectedItems.length === 1 && (
              <FlipBox flipId="step2" my={2}>
                <Typography component="p" color="secondary" variant="h3" align="center">
                  Select a card to play against
                </Typography>
              </FlipBox>
            )}
            {selectedItems.length > 1 && (
              <BoardWinner items={selectedItems} onReset={() => setSelectedItems([])} {...props} />
            )}
          </Box>
        </Flipper>
      </Flipped>
      <Box my={2}>
        <Grid container spacing={2}>
          {items.map(item => (
            <Grid item key={item.url} xs={12} sm={6} md={4}>
              <Flipped flipId={item.url}>
                <Box zIndex={5}>
                  <props.component
                    item={item}
                    selected={false}
                    onSelect={selectedItems.length < 2 ? addToSelection(item) : undefined}
                  />
                </Box>
              </Flipped>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Flipper>
  )
}

interface BoardWinnerProps<T extends WithId> extends BoardProps<T> {
  items: T[]
  onReset?: () => void
}

function BoardWinner<T extends WithId>(props: BoardWinnerProps<T>) {
  const winner = [...props.items].sort(props.compare).reverse()[0]

  return (
    <FlipBox flipId="step3" my={2} textAlign="center">
      <Typography component="p" variant="h2">
        The winner is...
      </Typography>
      <Box my={2}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <props.component item={winner} selected={false} />
          </Grid>
        </Grid>
      </Box>
      <Button size="large" variant="contained" color="primary" onClick={props.onReset}>
        Do it again
      </Button>
    </FlipBox>
  )
}
