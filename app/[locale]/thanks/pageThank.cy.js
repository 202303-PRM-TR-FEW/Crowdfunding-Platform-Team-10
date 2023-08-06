import React from "react";
import Thank from "./page";
import { NextIntlProvider } from "next-intl";

describe("<Thank />", () => {
  const locale = "en";
  const messages = require(`../../../messages/${locale}.json`);

  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <NextIntlProvider locale={locale} messages={messages}>
        <Thank />
      </NextIntlProvider>
    );
  });
});
