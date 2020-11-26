import React, { useState } from "react";
import LoginForm from "./components/Login";
import CustomModal from "./components/Actions/CustomModal";
import UsersPage from "pages/UsersPage";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import "./style.css";
import MapPage from "pages/MapPage";
import { Context, loadState, purgeState } from "./util/useAuth";
// import {getItems } from './components/Admin/index'

/**
 * TODO
 * - ADD A RISK FROM MY POSITION
 * - Display autorised for each user (UsersList) => (DONE)
 * - For each risk type display a different marker => (DONE)
 * - Upload image (DONE)
 * - popup style + image
 * - Store authenticated user session
 * - Disconnect
 * - protected routes
 * - Role management
 * - ERROR MGT
 * - REFACTOR
 */
export const hist = createBrowserHistory();
// load state
//purgeState()
const loadedState = loadState();

const App = () => {
  const [context, setContext] = useState(loadedState)

  return (
    <Context.Provider value={{...context, setContext}}>
      <Router history={hist}>
        <Switch>
          <Route path="/map" component={MapPage} />
          <Route path="/admin/map" component={MapPage} />
          <Route path="/admin/users" component={UsersPage} />
          <Route path="/client/map" component={MapPage} />
          <Route path="/modal" component={CustomModal} />
          <Route path="/" component={LoginForm} />
        </Switch>
      </Router>
    </Context.Provider>
  );
};

export default App;
