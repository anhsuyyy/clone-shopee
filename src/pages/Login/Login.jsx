import React from "react";
import BodyLogin from "./BodyLogin";
import HeaderLogin from "./HeaderLogin";
import Footer from "../../components/Layout/Footer";

export default function Login() {
  window.scrollTo(0, 0);

  return (
    <>
      <HeaderLogin />
      <BodyLogin />
      <Footer />
    </>
  );
}
