import { AuthCard } from "components/AuthCard";
import React, { FunctionComponent } from "react";

type LogInProps = {};
const LogIn: FunctionComponent<LogInProps> = (props) => {
  return (
    <>
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
