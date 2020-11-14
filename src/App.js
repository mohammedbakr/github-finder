import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios'
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  const searchUsers = async text => {
    setLoading(true)

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    setUsers(res.data.items)
    setLoading(false)
  }

  const getUser = async userName => {
    setLoading(true)

    const res = await axios.get(`https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    setUser(res.data)
    setLoading(false)
  }

  const getUserRepos = async userName => {
    setLoading(true)

    const res = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    setRepos(res.data)
    setLoading(false)
  }

  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }

  const setAlertHandler = (msg, type) => {
    setAlert({ msg, type })
    setTimeout(() => setAlert(null), 3000)
  }

  return (
      <Router>
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0} // return true or false
                    setAlert={setAlertHandler}
                  />
                  <Users
                    loading={loading}
                    users={users}
                  />
                </React.Fragment>
              )}  
            />
            <Route path="/about" component={About} />
            <Route
              path="/user/:login"
              render={props => <User
                {...props} // for routing and other props => props.history....etc
                getUser={getUser}
                getUserRepos={getUserRepos}
                user={user}
                repos={repos}
                loading={loading}
              />}
            />
          </Switch>
        </div>
      </Router>
  )
}

export default App;
