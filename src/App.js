import { useState } from 'react';
import dummyData from './data.json';
import Workspace from './Workspace';

function App() {
  const [data, setData] = useState(dummyData);
  return <Workspace data={data} setData={setData} />;
}

export default App;
