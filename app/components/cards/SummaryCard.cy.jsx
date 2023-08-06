import React from "react";
import SummaryCard from "./SummaryCard";

describe("<SummaryCard />", () => {
  const mockCard = {
    img: "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png",
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
  };

  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <SummaryCard
        img={mockCard.img}
        title={mockCard.title}
        goal={mockCard.goal}
        raised={mockCard.raised}
        category={mockCard.category}
        creator={mockCard.creator}
        viewCount={mockCard.viewCount}
        endingDate={mockCard.endingDate}
      />
    );

    cy.get("[data-cy=card-title]").should("have.text", mockCard.title);
  });
});

// it("should receive props from parent", () => {
//   // Assuming your component has a CSS class of "component" and the prop is rendered inside an element with class "prop"
//   cy.get(".prop").should("exist");
// });
