import { Box } from "@material-ui/core"
import * as React from "react"
import { Board } from "../../common/Board"
import { Fallback } from "../../common/Fallback"
import { People } from "../../state/people"
import { useApi } from "../../state/useApi"
import { PersonCard } from "./PersonCard"

export const PeopleScreen: React.FC = () => {
  const req = useApi<People>("people")
  return (
    <Box my={2}>
      <Fallback request={req}>
        {data => (
          <Board
            component={PersonCard}
            data={data.results}
            compare={(item1, item2) => Number(item1.mass) - Number(item2.mass)}
          />
        )}
      </Fallback>
    </Box>
  )
}
