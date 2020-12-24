import { Button } from "components/Button";
import { authContext } from "context/auth/auth.context";
import { FunctionComponent, useContext } from "react";
import styled from "styled-components";
import { TEXT } from "styles/constants";

const HeroText = styled.h1`
  ${TEXT.hero};
  text-align: center;
  margin-bottom: 55px;
`;

const CTAButtonContainer = styled.div`
  width: 300px;
  margin-bottom: 25px;
`;

const CTACaption = styled.div`
  ${TEXT.labelMedium};
`;

// eslint-disable-next-line @typescript-eslint/ban-types
type IndexProps = {};
const Index: FunctionComponent<IndexProps> = (props) => {
  const { signInWithGoogle } = useContext(authContext);
  return (
    <>
      <HeroText>
        Your tasks, <br /> done.
      </HeroText>
      <CTAButtonContainer>
        <Button isBig isFilled onClick={signInWithGoogle} fullWidth>
          Try now.
        </Button>
      </CTAButtonContainer>
      <CTACaption>You don’t need an account.</CTACaption>
    </>
  );
};

export default Index;
