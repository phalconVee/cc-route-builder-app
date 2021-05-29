import React from "react";
import { render } from "@testing-library/react";
import MockTheme from "../../../mocks/MockTheme";
import { mockMarker } from "../../../mocks/MockMarker";

import List from "../../../components/List/List";

describe("List", () => {
  it("should render a list with list elements", () => {
    const markers = [mockMarker(1)];
    const handleSort = jest.fn();
    const handleDelete = jest.fn();

    const { getByTestId } = render(
      <MockTheme>
        <List
          markers={markers}
          handleSort={handleSort}
          handleDelete={handleDelete}
        />
      </MockTheme>
    );
    const list = getByTestId("list");
    const listElement = getByTestId("list-element");

    expect(list).toBeInTheDocument();
    expect(list).toContainElement(listElement);
  });

  it("should render a list with multiple list elements", () => {
    const markers = [mockMarker(1), mockMarker(2), mockMarker(3)];
    const handleSort = jest.fn();
    const handleDelete = jest.fn();

    const { getByText } = render(
      <MockTheme>
        <List
          markers={markers}
          handleSort={handleSort}
          handleDelete={handleDelete}
        />
      </MockTheme>
    );

    expect(getByText("Waypoint 1")).toBeVisible();
    expect(getByText("Waypoint 2")).toBeVisible();
    expect(getByText("Waypoint 3")).toBeVisible();
  });
});
