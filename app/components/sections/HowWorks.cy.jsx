import React from "react";
import HowWorks from "./HowWorks";
import { NextIntlProvider } from "next-intl";

describe("<HowWorks />", () => {
  const locale = "en";
  const messages = require(`../../../messages/${locale}.json`);
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <NextIntlProvider locale={locale} messages={messages}>
        <HowWorks />{" "}
      </NextIntlProvider>
    );
  });
});
