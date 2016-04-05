import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import re, { selector } from './actions'
import { APP_ID } from './api'

@connect(selector, re.action)
export default class Login extends Component {
  onLogin (res) {
    if (res.accessToken) browserHistory.push('/app')
  }

  render () {
    return <FacebookLogin
      appId={APP_ID}
      autoLoad={this.props.auto !== undefined ? this.props.auto : true}
      callback={(res) => this.props.actions.login(res) && this.props.actions.getPosts() && this.onLogin(res)}
    />
  }
}
