import React from "react";
import NewsLetterCard from "./NewsLetterCard";
import { NextIntlProvider } from "next-intl";

describe("<NewsLetterCard />", () => {
  const locale = "en";
  const messages = require(`../../../messages/${locale}.json`);

  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <NextIntlProvider locale={locale} messages={messages}>
        <NewsLetterCard />,
      </NextIntlProvider>
    );
  });
});
