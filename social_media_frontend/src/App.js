import {Route, Switch} from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import HeaderPage from './components/header';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/signup"><Register/></Route>
        <Route exact path="/signin"><Login/></Route>
        <Route path="/"><HeaderPage/></Route>
      </Switch>
    </>
  );
}

export default App;
