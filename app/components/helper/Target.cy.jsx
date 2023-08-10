import React from "react";
import { NextIntlProvider } from "next-intl";
import Target, { formatNumber } from "./Target";
describe("<Target />", () => {
  const locale = "en";
  const messages = require(`../../../messages/${locale}.json`);

  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <NextIntlProvider locale={locale} messages={messages}>
        <Target />
      </NextIntlProvider>
    );
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
    cy.mount(
      <NextIntlProvider locale={locale} messages={messages}>
        <Target raised="100" goal="500" />
      </NextIntlProvider>
    );
    cy.get("p").should(($paragraphs) => {
      const contents = $paragraphs.map((index, el) => Cypress.$(el).text());
      expect(contents.get(0)).to.eq("$100");
      expect(contents.get(1)).to.eq("$500");
    });
  });
});
