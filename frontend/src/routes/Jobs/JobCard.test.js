import React from "react";
import { render } from "@testing-library/react";
import JobCard from "./JobCard";
import { MemoryRouter } from "react-router";

it("Should render", function () {
  render(
    <MemoryRouter>
      <JobCard job={{ title: "BOH member" }} />
    </MemoryRouter>
  );
});

it("Should match snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <JobCard job={{ title: "BOH member" }} />
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});
