import React from "react";
import { render } from "@testing-library/react";
import CompanyCard from "./CompanyCard";
import { MemoryRouter } from "react-router";

it("should render", function () {
  render(
    <MemoryRouter>
      <CompanyCard company={{ name: "test" }} />
    </MemoryRouter>
  );
});

it("matches snapshot ", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <CompanyCard
        handle="test"
        name="test name"
        description="this is the test"
        logo_url="test_url"
      />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
