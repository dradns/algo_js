import './App.css';
import {useState} from 'react';
var axios = require('axios');

function App() {
  const[page, setPage] = useState();

  const handleSubmit = async function()
  {
    let res1 = await axios.get('http://localhost:3002/some');
    console.log(res1);
    setPage('data:text/html;charset=utf-8,' + encodeURIComponent(res1.data));
  }
  const handleSubmitClosed = async function(){
    await axios.get('http://localhost:3002/users' ,{withCredentials:true})
  }
  const handleSubmitLogout = async function(){
    await axios.get('http://localhost:3002/logout' )
  }
  return (
    <div className="App">
      {/*<form>*/}
        {/*<input name={'username'}></input>*/}
        {/*<input name={'pass'}></input>*/}
        <button onClick={handleSubmit}>FILL</button>
        <iframe src={page} style={{height: '200px', width: '400px'}}></iframe>
        <button onClick={handleSubmitClosed}>CLOSED</button>
      <button onClick={handleSubmitLogout}>LOGOUT</button>
      {/*</form>*/}
    </div>
  );
}

export default App;
