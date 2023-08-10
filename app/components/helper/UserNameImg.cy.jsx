import React from "react";
import UserNameImg from "./UserNameImg";
import { NextIntlProvider } from "next-intl";

const userImg =
  "https://firebasestorage.googleapis.com/v0/b/crowdfunding-99b5a.appspot.com/o/01.jpg?alt=media&token=818eec3a-89ae-47e3-b7ad-ce55c728cf3c";
const userName = "John Doe";
describe("<UserNameImg />", () => {
  const locale = "en";
  const messages = require(`../../../messages/${locale}.json`);

  it("renders", () => {
    cy.mount(
      <NextIntlProvider locale={locale} messages={messages}>
        <UserNameImg />
      </NextIntlProvider>
    );
  });
  it("renders with props", () => {
    cy.mount(
      <NextIntlProvider locale={locale} messages={messages}>
        <UserNameImg userImg={userImg} userName={userName} />
      </NextIntlProvider>
    );

    cy.contains(".text-md", userName).should("be.visible");
    cy.contains(".text-xs", "organizing this fundraiser.").should("be.visible");
  });
});
