import React from "react";
import { render } from "@testing-library/react";
import MockTheme from "../../../mocks/MockTheme";

import SideNav from "../../../components/SideNav/SideNav";

describe("Sidebar", () => {
  it("should render a header", () => {
    const markers = [];
    const handleSort = jest.fn();
    const handleDelete = jest.fn();
    const handleDownload = jest.fn();

    const { getByTestId } = render(
      <MockTheme>
        <SideNav
          markers={markers}
          handleSort={handleSort}
          handleDelete={handleDelete}
          handleDownload={handleDownload}
        />
      </MockTheme>
    );
    const header = getByTestId("header");

    expect(header).toBeInTheDocument();
    expect(header).toContainHTML("<h1>Komoot Route Builder</h1>");
  });
});
