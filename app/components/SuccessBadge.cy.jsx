import React from "react";
import SuccessBadge from "./SuccessBadge";
import { NextIntlProvider } from "next-intl";

describe("<SuccessBadge />", () => {
  const locale = "en";
  const messages = require(`../../messages/${locale}.json`);
  const mockProject = {
    endingDate: "Mon, 31 Jul 2023 11:32:49 GMT",
    raised: 600,
    goal: 1600,
  };

  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <NextIntlProvider locale={locale} messages={messages}>
        <SuccessBadge
          endingDate={mockProject.endingDate}
          raised={mockProject.raised}
          goal={mockProject.goal}
        />
      </NextIntlProvider>
    );

    cy.get("[data-cy=badge-title]").should("have.text", "Closed");
  });
});
