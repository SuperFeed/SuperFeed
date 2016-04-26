import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

export default class CreatePostForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      text: '',
      image: ''
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

  onDrop (file) {
    console.log("Recieved File: ", file)
    this.state.image = file
  }

  render () {
    return <form className='ui form' onSubmit={::this.onSubmit}>
      <textarea className='ui top attached segment' rows='3' style={{ resize: 'none' }} value={this.state.text} onChange={::this.onFormChange} />
    <Dropzone className='ui left attached segment' rows='1' onDrop={::this.onDrop} accept='image/*'><i className='large photo icon'/></Dropzone>
      <button className='ui fluid bottom attached blue button' type='submit'><i className='large send icon' /></button>
    </form>
  }
}
