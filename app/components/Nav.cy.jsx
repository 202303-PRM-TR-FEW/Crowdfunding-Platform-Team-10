import React from "react";
import Nav from "./Nav";
import { AuthContextProvider } from "@/context/AuthContext";

describe("<Nav />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <AuthContextProvider>
        <Nav />
      </AuthContextProvider>
    );
  });
});
