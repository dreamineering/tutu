import Link from 'next/link';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div>
      <ul>
        <li>
          <Link href="/debug">
            <a>Debug</a>
          </Link>
        </li>
        <li>
          <Link href="/eth-components">
            <a>Eth Components</a>
          </Link>
        </li>
        <li>
          <Link href="/subgraph">
            <a>Subgraph</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Index;
