import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { COLORS, ELEVATION } from "styles/constants";

const StyledProfileImage = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: auto;
  border-radius: 50%;
  border: 2px solid ${COLORS.ui.ui1};
  ${ELEVATION.low};
`;

type ProfilePictureProps = {
  src: string;
  size: string;
};
const ProfilePicture: FunctionComponent<ProfilePictureProps> = ({
  src,
  size,
}) => {
  return <StyledProfileImage src={src} size={size} alt="Profile image" />;
};

export default ProfilePicture;
