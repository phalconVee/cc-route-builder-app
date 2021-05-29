import React from "react";
import { render } from "@testing-library/react";
import MockTheme from "../../../mocks/MockTheme";

import Button from "../../../components/Button/Button";

describe("Button", () => {
  it("should render a custom button correctly", () => {
    const { getByTestId } = render(
      <MockTheme>
        <Button />
      </MockTheme>
    );
    const button = getByTestId("custom-button");

    expect(button).toBeInTheDocument();
  });
});
