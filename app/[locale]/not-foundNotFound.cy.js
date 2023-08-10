import React from "react";
import NotFound from "./not-found";
import { NextIntlProvider } from "next-intl";

describe("<NotFound />", () => {
  const locale = "en";
  const messages = require(`../../messages/${locale}.json`);
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <NextIntlProvider locale={locale} messages={messages}>
        <NotFound />
      </NextIntlProvider>
    );
  });
});
