import React from "react";

import Target, { formatNumber } from "./Target";
describe("<Target />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Target />);
    cy.screenshot("target-component", { capture: "viewport" });
    cy.contains("Raised:");
    cy.contains("Goal:");
  });
  it("formats numbers correctly", () => {
    expect(formatNumber(0)).to.equal("0");
    expect(formatNumber(100)).to.equal("100");
    expect(formatNumber(1000)).to.equal("1000");
    expect(formatNumber(1500000)).to.equal("1.5M");
  });
  it("renders with different prop values", () => {
    cy.mount(<Target raised="100" goal="500" />);
    cy.get("p").should(($paragraphs) => {
      const contents = $paragraphs.map((index, el) => Cypress.$(el).text());
      expect(contents.get(0)).to.eq("$100");
      expect(contents.get(1)).to.eq("$500");
    });
  });
});
