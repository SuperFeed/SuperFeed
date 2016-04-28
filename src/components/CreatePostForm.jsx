import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

/* global FileReader */

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
    this.props.onSubmit(this.state.text, this.state.image)
    this.setState({ text: '', image: '' })
  }

  onDrop (file) {
    var reader = FileReader()
    reader.addEventListener('load', () => {
      this.setState({image: reader.result})
    }, false)
    if (file) {
      reader.readAsDataURL(file[0])
    }
  }

  onClick (file) {
    var reader = new FileReader()
    reader.addEventListener('load', () => {
      this.setState({image: reader.result})
    }, false)
    if (file) {
      reader.readAsDataURL(file[0])
    }
  }

  render () {
    return <form className='ui form' onSubmit={::this.onSubmit}>
      <textarea className='ui top attached segment' rows='3' style={{ resize: 'none' }} value={this.state.text} onChange={::this.onFormChange} />
      <Dropzone className='ui fluid attached blue button' rows='1' onClick={::this.onClick} onDrop={::this.onDrop} accept='image/*'><i className='large photo icon'/></Dropzone>
      <button className='ui fluid bottom attached blue button' type='submit'><i className='large send icon' /></button>
    </form>
  }
}
