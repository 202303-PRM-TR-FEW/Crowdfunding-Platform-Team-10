import React from "react";
import AboutSection from "./AboutUs";
import { NextIntlProvider } from "next-intl";

describe("<AboutSection />", () => {
  const locale = "en";
  const messages = require(`../../../messages/${locale}.json`);

  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <NextIntlProvider locale={locale} messages={messages}>
        <AboutSection />
      </NextIntlProvider>
    );
  });
});
