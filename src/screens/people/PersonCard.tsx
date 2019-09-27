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
import { FormattedNumber } from "react-intl"
import { BoardItemProps } from "../../common/Board"
import { People } from "../../state/people"

export const PersonCard: React.FC<BoardItemProps<People>> = props => {
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
          />
          <Collapse in={props.selected}>
            <CardContent>
              <Typography variant="body1">
                <strong>Gender:</strong> {props.item.gender}
              </Typography>
              <Typography variant="body1">
                <strong>Mass:</strong> <FormattedNumber value={Number(props.item.mass)} />
                kg
              </Typography>
              <Typography variant="body1">
                <strong>Height:</strong> <FormattedNumber value={Number(props.item.height)} />
                cm
              </Typography>
            </CardContent>
          </Collapse>
        </CardActionArea>
      </Box>
    </Card>
  )
}
