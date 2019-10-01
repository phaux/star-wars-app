import * as React from "react"
import { render, fireEvent } from "@testing-library/react"
import { Board } from "./Board"

const mockData = [
  { url: "https://example.com/item/1", name: "Item 1", power: 1 },
  { url: "https://example.com/item/2", name: "Item 2", power: 2 },
  { url: "https://example.com/item/3", name: "Item 3", power: 3 },
]

beforeAll(() => {
  window.scrollTo = jest.fn().mockImplementation(() => {})
})

afterAll(() => {
  jest.restoreAllMocks()
})

it("completes single game flow", async () => {
  const { queryByText, findByText } = render(
    <Board
      component={({ item, onSelect }) => <button onClick={onSelect}>{item.name}</button>}
      data={mockData}
      compare={(itemA, itemB) => itemA.power - itemB.power}
    />,
  )

  const firstMessage = /your card/iu
  const secondMessage = /card to play against/iu
  const thirdMessage = /winner/iu

  await findByText(firstMessage)
  expect(queryByText(secondMessage)).toBeFalsy()

  fireEvent.click(queryByText(mockData[0].name)!)
  // should advance to second step

  await findByText(secondMessage)
  expect(queryByText(thirdMessage)).toBeFalsy()

  fireEvent.click(queryByText(mockData[0].name)!)
  // click again, nothing should happen

  await findByText(secondMessage)
  expect(queryByText(thirdMessage)).toBeFalsy()

  fireEvent.click(queryByText(mockData[1].name)!)
  // should show the winner

  await findByText(thirdMessage)
})
