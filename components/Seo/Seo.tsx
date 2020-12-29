import { NextSeo } from "next-seo";
import React, { FunctionComponent } from "react";

type SeoProps = {
  title: string;
};
const Seo: FunctionComponent<SeoProps> = ({ title }) => {
  return <NextSeo title={title} />;
};

export default Seo;
