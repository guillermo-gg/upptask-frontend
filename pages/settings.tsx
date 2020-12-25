import { PrivateContainer } from "components/PrivateContainer";
import { HeaderTypes } from "components/PrivateContainer/Header";
import React, { FunctionComponent } from "react";

type SettingsProps = {};
const Settings: FunctionComponent<SettingsProps> = (props) => {
  return (
    <PrivateContainer.Content
      header={{
        type: HeaderTypes.REGULAR,
        title: "Settings",
        description: "Your user information",
      }}
    >
      Actual content
    </PrivateContainer.Content>
  );
};

export default Settings;
