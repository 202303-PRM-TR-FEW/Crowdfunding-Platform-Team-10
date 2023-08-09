import React from "react";
import Footer from "./Footer";
import { NextIntlProvider } from "next-intl";

describe("<Footer />", () => {
  const locale = "en";
  const messages = require(`../../messages/${locale}.json`);

  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <NextIntlProvider locale={locale} messages={messages}>
        <Footer />
      </NextIntlProvider>
    );
  });
});
