import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Search extends Component {
  state = {
    text: ''
  }

  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value })

  onSubmitHandler = e => {
    e.preventDefault()
    if (!this.state.text) {
      this.props.setAlert('Please enter something', 'light') 
    } else {
      this.props.searchUsers(this.state.text)
      this.setState({ text: '' })
    }
  }

  render() {
    const { showClear, clearUsers } = this.props

    return (
      <div>
        <form
          className="form"
          onSubmit={this.onSubmitHandler}
        >
          <input
            type="text"
            name="text"
            placeholder="Search Users..."
            value={this.state.text}
            onChange={this.onChangeHandler}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {showClear && <button
          className="btn btn-light btn-block"
          onClick={clearUsers}
        >Clear</button>}
      </div>
    )
  }
}

Search.prototypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
}

export default Search
