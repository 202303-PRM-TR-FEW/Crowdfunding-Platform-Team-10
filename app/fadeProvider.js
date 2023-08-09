"use client";

import { Fade } from "react-awesome-reveal";

function FadeProvider({ children }) {
  return <Fade>{children}</Fade>;
}

export default FadeProvider;
