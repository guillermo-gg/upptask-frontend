import { FunctionComponent } from "react";
import styled from "styled-components";

const MainTitle = styled.h1`
  font-weight: bold;
  font-size: 3rem;
`;

// eslint-disable-next-line @typescript-eslint/ban-types
type IndexProps = {};
const Index: FunctionComponent<IndexProps> = (props) => {
  return (
    <>
      <MainTitle>Awesome Tasks</MainTitle>
    </>
  );
};

export default Index;
