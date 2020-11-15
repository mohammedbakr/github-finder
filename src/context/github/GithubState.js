import React, { useReducer } from 'react'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import axios from 'axios'

import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
} from '../types'

let githubClientId
let githubClientSecret

if (process.env.MODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET
}

const GithubSatet = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState)

  // Search Users
  const searchUsers = async text => {
    setLoading()

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`)

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    })
  }

  // Get User
  const getUser = async userName => {
    setLoading()

    const res = await axios.get(`https://api.github.com/users/${userName}?client_id=${githubClientId}&client_secret=${githubClientSecret}`)

    dispatch({
      type: GET_USER,
      payload: res.data
    })
  }

  // Get Repos
  const getUserRepos = async userName => {
    setLoading()

    const res = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`)

    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  }

  // Clear Users
  const clearUsers = () => dispatch({
    type: CLEAR_USERS
  })

  // SetLoading
  const setLoading = () => dispatch({
    type: SET_LOADING
  })

  return <GithubContext.Provider
    value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers,
      clearUsers,
      getUser,
      getUserRepos
    }}
  >
    {props.children}
  </GithubContext.Provider>
}

export default GithubSatet