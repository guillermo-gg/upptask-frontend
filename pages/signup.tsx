import { AuthCard } from "components/AuthCard";
import React, { FunctionComponent } from "react";

type SignUpProps = {};
const SignUp: FunctionComponent<SignUpProps> = (props) => {
  return (
    <>
      <AuthCard
        headerCopy="Sign up to"
        footerCopy={{
          firstLine: "Already have an account?",
          secondLine: "Log in",
          target: "/login",
        }}
      />
    </>
  );
};

export default SignUp;
