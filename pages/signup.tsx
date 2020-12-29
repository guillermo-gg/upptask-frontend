import { AuthCard } from "components/AuthCard";
import { Seo } from "components/Seo";
import React, { FunctionComponent } from "react";

type SignUpProps = {};
const SignUp: FunctionComponent<SignUpProps> = (props) => {
  return (
    <>
      <Seo title="Sign up to Upptask" />
      <AuthCard
        headerCopy="Sign up to"
        footerCopy={{
          firstLine: "Already have an account?",
          secondLine: "Log in",
          target: "/login",
        }}
        includeTnC
      />
    </>
  );
};

export default SignUp;
