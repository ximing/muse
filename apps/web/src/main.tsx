import { render } from 'solid-js/web';

import './index.css';

function HelloWorld() {
  return <div>Hello World!</div>;
}

render(() => <HelloWorld />, document.getElementById('root')!);
