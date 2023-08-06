import React from "react";
import SuccessfulCard from "./SuccessfulCard";

describe("<SuccessfulCard />", () => {
  const mockProject = {
    url: "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png",
    title: "Card Title",
    raised: 600,
    goal: 1600,
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
    cy.mount(<SuccessfulCard project={mockProject} />);
    cy.get("[data-cy=card-about]").should("have.text", mockProject.about);
  });
});
