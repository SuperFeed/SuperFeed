import React, { Component } from 'react'

export default class CreatePostForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      text: ''
    }
  }

  onFormChange (e) {
    this.setState({ text: e.target.value })
  }

  onSubmit (e) {
    e.preventDefault()

    this.props.onSubmit(this.state.text)
    this.setState({ text: '' })
  }

  render () {
    return <form className='ui form' onSubmit={::this.onSubmit}>
      <textarea className='ui top attached segment' rows='3' style={{ resize: 'none' }} value={this.state.text} onChange={::this.onFormChange} />
      <button className='ui fluid bottom attached blue button' type='submit'><i className='large send icon' /></button>
    </form>
  }
}
