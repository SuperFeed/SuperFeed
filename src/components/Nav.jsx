import React from 'react'

const Item = ({ active, children }) => <a className={`item ${active ? 'active' : ''}`}>{children}</a>

export default ({ onChange, location }) => <div className='ui secondary pointing three item menu' style={{ position: 'fixed' }}>
  <Item active={location === 'login'}>Login</Item>
  <Item active={location === 'app'}>App</Item>
  <Item active={location === 'settings'}>Settings</Item>
</div>

export const Container = ({ children }) => <div style={{ paddingTop: '3rem' }}>
  {children}
</div>
