import React, { Component } from 'react'
import Helmet from 'react-helmet'

export default class Root extends Component {
  render () {
    return <div>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        title='SuperFeed'
        titleTemplate='SuperFeed - %s'
        meta={[
          { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ]}
        link={[
          { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css' },
          { rel: 'stylesheet', href: '//oss.maxcdn.com/semantic-ui/2.1.8/semantic.min.css' }
        ]}
        script={[
          { src: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js' }
        ]}
      />

      {this.props.children}
    </div>
  }
}
