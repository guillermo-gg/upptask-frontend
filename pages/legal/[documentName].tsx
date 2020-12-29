import { Seo } from "components/Seo";
import fs from "fs";
import path from "path";
import { Converter } from "showdown";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import {
  COLORS,
  ELEVATION,
  STANDARD_BORDER_RADIUS,
  TEXT,
} from "styles/constants";
import { flexFullCenterColumn, flexFullCenterRow } from "styles/mixins";

const PageContainer = styled.div`
  ${flexFullCenterColumn};
  margin: 20vh 20px;
  max-width: 900px;
`;

const Title = styled.h1`
  ${TEXT.subheader};
  color: ${COLORS.brand.primary};
  margin-bottom: 10px;
`;

const LastUpdated = styled.div`
  ${TEXT.labelSmall};
  font-style: italic;
  color: ${COLORS.brand.primary};
  margin-bottom: 25px;
`;

const ContentCard = styled.main`
  padding: 75px;
  background-color: ${COLORS.ui.white};
  border-radius: ${STANDARD_BORDER_RADIUS};
  ${ELEVATION.low};

  // Content styles:

  & > * :first-child {
    margin-top: 0;
  }

  h2 {
    font-size: 1.05rem;
    margin-bottom: 1.5rem;
    margin-top: 3.5rem;
    font-weight: 600;
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.3rem;
  }

  ul {
    list-style-type: circle;
    margin-left: 50px;
  }
  ol {
    list-style-type: upper-roman;
    margin-left: 50px;
  }

  li {
    margin-bottom: 0.8rem;
  }

  em {
    font-style: italic;
  }

  strong {
    font-weight: bold;
  }
`;

type LegalTermsPageProps = {
  content: string;
  title: string;
  lastUpdated: string;
};
const LegalTermsPage: FunctionComponent<LegalTermsPageProps> = ({
  content,
  title,
  lastUpdated,
}) => {
  return (
    <PageContainer>
      <Seo title={`${title} | Upptask`} />
      <Title>{title}</Title>
      <LastUpdated>Last updated: {lastUpdated}</LastUpdated>
      <ContentCard dangerouslySetInnerHTML={{ __html: content }} />
    </PageContainer>
  );
};

export default LegalTermsPage;

export const getStaticProps = async ({ params: { documentName } }) => {
  const documentContent = fs.readFileSync(
    path.join(process.cwd(), "content", `${documentName}.md`),
    "utf8"
  );

  const converter = new Converter({ metadata: true });

  const content = converter.makeHtml(documentContent);
  const { title, lastUpdated } = converter.getMetadata();

  return {
    props: {
      title,
      lastUpdated,
      content,
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { documentName: "privacy-note" } },
      { params: { documentName: "terms-and-conditions" } },
    ],
    fallback: false,
  };
}
