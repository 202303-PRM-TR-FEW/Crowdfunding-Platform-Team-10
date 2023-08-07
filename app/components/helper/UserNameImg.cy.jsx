import React from "react";
import UserNameImg from "./UserNameImg";
import { Avatar } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
const userImg =
  "https://firebasestorage.googleapis.com/v0/b/crowdfunding-99b5a.appspot.com/o/01.jpg?alt=media&token=818eec3a-89ae-47e3-b7ad-ce55c728cf3c";
const userName = "John Doe";
describe("<UserNameImg />", () => {
  it("renders", () => {
    cy.mount(<UserNameImg />);
  });
  it("renders with props", () => {
    cy.mount(<UserNameImg userImg={userImg} userName={userName} />);

    cy.contains(".text-md", userName).should("be.visible");
    cy.contains(".text-xs", "organizing this fundraiser.").should("be.visible");
  });
});
