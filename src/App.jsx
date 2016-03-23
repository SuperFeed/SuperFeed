import React, { Component } from 'react'
import { connect } from 'react-redux'
import re, { selector } from './actions'

@connect(selector, re.action)
export default class App extends Component {
  render () {
    return <div className='ui button'>
      Auth: {JSON.stringify(this.props.auth)}
    </div>
  }
}
