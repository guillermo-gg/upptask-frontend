import { authContext } from "context/auth/auth.context";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import styled, { css } from "styled-components";
import { COLORS, TRANSITION } from "styles/constants";

const Container = styled.div<{ isOpen: boolean }>`
  width: ${({ isOpen }) => (isOpen ? "350px" : "100px")};

  background: lightgray;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RightArrows = styled.button<{ isOpen: boolean }>`
  height: 20px;
  width: 100%;
  margin-bottom: 10px;
  outline: none;

  img {
    height: 100%;
    width: auto;

    transform: rotate(${({ isOpen }) => (isOpen ? "180deg" : 0)});
  }
`;

const BoardListContainer = styled.div`
  background-color: blue;
  flex: 1;
  width: 100%;
  margin-bottom: 30px;
`;

const BoardsHeader = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
`;

const AuthInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 150px;

  button {
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    outline: none;
  }
`;

const ProfileImage = styled.img`
  width: 50px;
  height: auto;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const EmailText = styled.div`
  margin-bottom: 15px;
`;

type SidebarProps = {};
const Sidebar: FunctionComponent<SidebarProps> = (props) => {
  const { user, signOut, signInWithGoogle } = useContext(authContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMouseOver, setIsMouseOver] = useState(true);
  const [isSidebarPinned, setIsSidebarPinned] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(isMouseOver || isSidebarPinned);
  }, [isMouseOver, isSidebarPinned]);

  return (
    <Container
      isOpen={isSidebarOpen || isSidebarPinned}
      // onMouseEnter={() => setIsMouseOver(true)}
      // onMouseLeave={() => setIsMouseOver(false)}
    >
      <RightArrows
        isOpen={isSidebarOpen}
        onClick={() => setIsSidebarPinned((current) => !current)}
      >
        <img src="/assets/right-arrows.svg" alt="Right arrows" />
      </RightArrows>
      <BoardListContainer>
        {isSidebarOpen && (
          <>
            <BoardsHeader>Boards</BoardsHeader>
            <ul>
              {[
                {
                  name: "Board title",
                  id: user.columnsId,
                },
              ].map(({ name, id }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          </>
        )}
      </BoardListContainer>
      <AuthInfoContainer>
        <ProfileImage src={user.photoURL} />
        {isSidebarOpen && <EmailText>{user?.email}</EmailText>}
        <button type="button" onClick={signOut}>
          Log out
        </button>
      </AuthInfoContainer>
    </Container>
  );
};

export default Sidebar;
