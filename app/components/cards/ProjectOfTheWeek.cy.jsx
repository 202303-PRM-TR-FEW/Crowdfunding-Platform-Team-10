import React from "react";
import ProjectOfTheWeek from "./ProjectOfTheWeek";
import { NextIntlProvider } from "next-intl";

describe("<ProjectOfTheWeek />", () => {
  const locale = "en";
  const messages = require(`../../../messages/${locale}.json`);
  const mockProject = {
    url: "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png",
    name: "Card Title",
    raised: 600,
    goal: 1600,
    id: "123123123",
    creator: {
      userName: "Sadık Barış Yılmaz",
      userImg:
        "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png",
    },
    viewCount: 1000,
    endingDate: "Mon, 31 Jul 2023 11:32:49 GMT",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
  };

  it("renders", () => {
    // see: https://on.cypress.io/mounting-react

    cy.mount(
      <NextIntlProvider locale={locale} messages={messages}>
        <ProjectOfTheWeek projectOfWeek={mockProject} />
      </NextIntlProvider>
    );
    cy.get("[data-cy=project-name]").should("have.text", mockProject.name);
    cy.get("[data-cy=project-about]").should("have.text", mockProject.about);
  });
});
