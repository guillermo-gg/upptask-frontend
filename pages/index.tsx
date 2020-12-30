import { Button } from "components/Button";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
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
  const router = useRouter();
  return (
    <>
      <HeroText>
        Your tasks, <br /> done.
      </HeroText>
      <CTAButtonContainer>
        <Button isBig isFilled onClick={() => router.push("/signup")} fullWidth>
          Get started now
        </Button>
      </CTAButtonContainer>
      <CTACaption>It&apos;s completely free.</CTACaption>
    </>
  );
};

export default Index;
