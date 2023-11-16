import React from "react";
import { render } from "@testing-library/react";
import Companies from "./CompanyList";
import { MemoryRouter } from "react-router";

it("should render companies", function () {
  render(<Companies />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Companies />);
  expect(asFragment()).toMatchSnapshot();
});
