import { AuthCard } from "components/AuthCard";
import { Seo } from "components/Seo";
import React, { FunctionComponent } from "react";

type LogInProps = {};
const LogIn: FunctionComponent<LogInProps> = (props) => {
  return (
    <>
      <Seo title="Log in to Upptask" />
      <AuthCard
        headerCopy="Log in to"
        footerCopy={{
          firstLine: "Don't have an account yet?",
          secondLine: "Sign up",
          target: "/signup",
        }}
      />
    </>
  );
};

export default LogIn;
