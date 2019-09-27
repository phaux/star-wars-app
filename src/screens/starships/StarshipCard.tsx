import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Collapse,
  Typography,
} from "@material-ui/core"
import * as React from "react"
import { FormattedNumber, FormattedPlural } from "react-intl"
import { BoardItemProps } from "../../common/Board"
import { Starship } from "../../state/starships"

export const StarshipCard: React.FC<BoardItemProps<Starship>> = props => {
  const bgcolor =
    props.color === "primary"
      ? ("primary.main" as const)
      : props.color === "secondary"
      ? ("secondary.main" as const)
      : undefined

  return (
    <Card>
      <Box clone minHeight={100}>
        <CardActionArea disableRipple={props.onSelect == null} onClick={props.onSelect}>
          <CardHeader
            avatar={
              <Box clone bgcolor={bgcolor}>
                <Avatar>{props.item.name[0]}</Avatar>
              </Box>
            }
            title={props.item.name}
            subheader={props.item.starship_class}
          />
          <Collapse in={props.selected}>
            <CardContent>
              <Typography variant="body1">
                <strong>Model:</strong> {props.item.model}
              </Typography>
              <Typography variant="body1">
                <strong>Crew:</strong> <FormattedNumber value={Number(props.item.crew)} />{" "}
                <FormattedPlural value={Number(props.item.crew)} one="person" other="people" />
              </Typography>
              <Typography variant="body1">
                <strong>Passengers:</strong>{" "}
                <FormattedNumber value={Number(props.item.passengers)} />{" "}
                <FormattedPlural
                  value={Number(props.item.passengers)}
                  one="person"
                  other="people"
                />
              </Typography>
            </CardContent>
          </Collapse>
        </CardActionArea>
      </Box>
    </Card>
  )
}
