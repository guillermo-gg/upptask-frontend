import React, { FunctionComponent } from "react";

type PublicContainerProps = {};
const PublicContainer: FunctionComponent<PublicContainerProps> = ({
  children,
}) => {
  return <>{children}</>;
};

export default PublicContainer;
