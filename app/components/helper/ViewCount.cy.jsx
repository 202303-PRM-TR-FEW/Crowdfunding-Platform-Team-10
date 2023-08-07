import React from "react";
import ViewCount, { formatNumber } from "./ViewCount";
import eyeIcon from "../../../public/assets/images/chart.png";

describe("<ViewCount />", () => {
  it("renders  ", () => {
    cy.mount(<ViewCount />);
  });

  it("renders with custom viewCount props", () => {
    const viewCount = 1500000;
    cy.mount(<ViewCount viewCount={viewCount} />);
    const formattedViewCount = formatNumber(viewCount);
    cy.contains(".color-green", formattedViewCount).should("be.visible");
    cy.get('img[alt="eye"]').should("be.visible");
    cy.get('img[alt="eye"]').should("have.attr", "width", "20");
    cy.get('img[alt="eye"]').should("have.attr", "height", "20");
  });
});
