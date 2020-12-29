import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect } from "react";

type PageNotFoundProps = {};
const PageNotFound: FunctionComponent<PageNotFoundProps> = (props) => {
  const { replace } = useRouter();
  useEffect(() => {
    replace("/");
  }, [replace]);
  return <></>;
};

export default PageNotFound;
