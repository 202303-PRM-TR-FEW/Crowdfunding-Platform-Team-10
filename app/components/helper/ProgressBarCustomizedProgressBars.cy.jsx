import React from "react";
import CustomizedProgressBars from "./ProgressBar";

describe("<CustomizedProgressBars />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CustomizedProgressBars />);
  }),
    it("renders with props", () => {
      const raised = 50;
      const goal = 100;
      cy.mount(<CustomizedProgressBars raised={raised} goal={goal} />);
    });
});
