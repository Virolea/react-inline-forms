import React, { Component } from 'react'

class RIInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editing: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    if (!this.props.onFormSubmit) {
      throw 'You need to pass a handler fonction to the onFormSubmit prop!'
    }

    this.props.onFormSubmit()
      .then(() => this.setState({ editing: false }))
      .catch(err => this.props.onFormError && this.props.onFormError())
  }

  render() {
    const { editing } = this.state
    return (
      <form
        onClick={() => this.setState({ editing: true })}
        onSubmit={this.handleSubmit}
      >
        {
          editing ?
          <input
            autoFocus
            type="text"
            className={this.props.classes}
            placeholder={this.props.placdeholder}
            value={this.props.value}
            onChange={this.props.onInputChange}
          /> :
          this.props.children
        }
      </form>
    )
  }
}

export default RIInput
