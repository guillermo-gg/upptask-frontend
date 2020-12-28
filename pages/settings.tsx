import { Button } from "components/Button";
import { PrivateContainer } from "components/PrivateContainer";
import { HeaderTypes } from "components/PrivateContainer/Header";
import { ProfilePicture } from "components/ProfilePicture";
import { TextInput } from "components/TextInput";
import { authContext } from "context/auth/auth.context";
import React, { FunctionComponent, useContext } from "react";
import styled from "styled-components";
import { COLORS, TEXT } from "styles/constants";

const SettingsContainer = styled.div`
  max-width: 800px;
`;

const TwoColumnsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const InfoContainer = styled.div`
  margin-left: 150px;
  flex: 1;
`;

const InfoFieldContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 25px;
`;

const DisclaimerText = styled.p`
  margin: 75px auto;
  width: 70%;
  text-align: center;

  ${TEXT.labelSmall};
  color: ${COLORS.text.textGray1};
`;

type SettingsProps = {};
const Settings: FunctionComponent<SettingsProps> = (props) => {
  const { user, deleteUser } = useContext(authContext);

  return (
    <PrivateContainer.Content
      header={{
        type: HeaderTypes.REGULAR,
        title: "Settings",
        description: "Manage your account",
      }}
    >
      <SettingsContainer>
        <TwoColumnsContainer>
          <ProfilePicture src={user?.photoURL} size="250px" />
          <InfoContainer>
            <InfoFieldContainer>
              <TextInput value={user?.displayName} label="Name" />
            </InfoFieldContainer>
            <InfoFieldContainer>
              <TextInput value={user?.email} label="Email" />
            </InfoFieldContainer>
            <ButtonContainer>
              <Button isFilled fullWidth onClick={deleteUser}>
                Delete account
              </Button>
            </ButtonContainer>
          </InfoContainer>
        </TwoColumnsContainer>
        <DisclaimerText>
          We fetch this information directly from your Google account. If you
          want to change it, change it there, and we’ll automatically uptate it
          here.
        </DisclaimerText>
      </SettingsContainer>
    </PrivateContainer.Content>
  );
};

export default Settings;
