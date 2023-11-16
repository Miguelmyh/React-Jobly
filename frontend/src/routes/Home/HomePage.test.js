import React from "react";
import { render } from "@testing-library/react";
import HomePage from "./HomePage";
import { MemoryRouter } from "react-router";

it("should render", function () {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
});
