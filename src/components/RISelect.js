import React, { Component } from 'react'

class RISelect extends Component {
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
      >
        {
          editing ?
          <select
            onChange={this.handleSubmit}
            className={this.props.classes}
            value={this.props.value}
          >
            {this.props.collection.map((item) => (
              <option value={item.value}>{item.name}</option>
            ))}
          </select> :
          this.props.children
        }
      </form>
    )
  }
}

export default RISelect
