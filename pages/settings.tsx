import { Button } from "components/Button";
import { PrivateContainer } from "components/PrivateContainer";
import { HeaderTypes } from "components/PrivateContainer/Header";
import { ProfilePicture } from "components/ProfilePicture";
import { TextInput } from "components/TextInput";
import { authContext } from "context/auth/auth.context";
import React, { FunctionComponent, useContext } from "react";
import styled from "styled-components";

const SettingsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const InfoContainer = styled.div`
  margin-left: 150px;
  width: 350px;
`;

const InfoFieldContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 25px;
`;

type SettingsProps = {};
const Settings: FunctionComponent<SettingsProps> = (props) => {
  const { user } = useContext(authContext);

  return (
    <PrivateContainer.Content
      header={{
        type: HeaderTypes.REGULAR,
        title: "Settings",
        description: "Manage your account",
      }}
    >
      <SettingsContainer>
        <ProfilePicture src={user?.photoURL} size="250px" />
        <InfoContainer>
          <InfoFieldContainer>
            <TextInput value={user?.displayName} label="Name" />
          </InfoFieldContainer>
          <InfoFieldContainer>
            <TextInput value={user?.email} label="Email" />
          </InfoFieldContainer>
          <ButtonContainer>
            <Button isFilled fullWidth onClick={() => alert("Handle delete")}>
              Delete account
            </Button>
          </ButtonContainer>
        </InfoContainer>
      </SettingsContainer>
    </PrivateContainer.Content>
  );
};

export default Settings;
