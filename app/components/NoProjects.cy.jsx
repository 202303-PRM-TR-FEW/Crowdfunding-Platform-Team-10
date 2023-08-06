import React from "react";
import { NoProjects } from "./NoProjects";
import { AuthContextProvider } from "@/context/AuthContext";

describe("<NoProjects />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <AuthContextProvider>
        <NoProjects />
      </AuthContextProvider>
    );
  });
});
