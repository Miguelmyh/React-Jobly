import React from "react";
import { render } from "@testing-library/react";
import Jobs from "./Jobs";
import { MemoryRouter } from "react-router";

it("should render", function () {
  render(
    <MemoryRouter>
      <Jobs />
    </MemoryRouter>
  );
});
