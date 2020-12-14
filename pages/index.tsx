import Link from "next/link";
import { FunctionComponent } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
type IndexProps = {};
const Index: FunctionComponent<IndexProps> = (props) => {
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
    </>
  );
};

export default Index;
