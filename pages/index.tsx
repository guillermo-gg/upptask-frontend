import { authContext } from "context/auth/auth.context";
import Link from "next/link";
import { FunctionComponent, useContext } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
type IndexProps = {};
const Index: FunctionComponent<IndexProps> = (props) => {
  const { user, signOut, signInWithGoogle } = useContext(authContext);

  return (
    <>
      <h1>Hi</h1>
      <ul>
        <li>
          <Link href="/kanban/demo-board">
            <a>Demo board</a>
          </Link>
        </li>
      </ul>
      <div>{user?.email ?? "Not signed in"}</div>
      <button type="button" onClick={user ? signOut : signInWithGoogle}>
        {user?.email ? "sign out" : "sign in"}
      </button>
    </>
  );
};

export default Index;
