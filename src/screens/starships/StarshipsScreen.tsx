import { Box } from "@material-ui/core"
import * as React from "react"
import { Board } from "../../common/Board"
import { Fallback } from "../../common/Fallback"
import { Starship } from "../../state/starships"
import { useApi } from "../../state/useApi"
import { StarshipCard } from "./StarshipCard"

export const StarshipsScreen: React.FC = () => {
  const req = useApi<Starship>("starships")
  return (
    <Box my={2}>
      <Fallback request={req}>
        {data => (
          <Board
            component={StarshipCard}
            data={data.results}
            compare={(item1, item2) => Number(item1.crew) - Number(item2.crew)}
          />
        )}
      </Fallback>
    </Box>
  )
}
