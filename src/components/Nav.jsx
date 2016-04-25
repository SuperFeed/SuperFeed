import React from 'react'

const NUMS = ['zero', 'one', 'two', 'three', 'four']

export const NavItem = ({ children, onClick }) => <a className='item' onClick={onClick}>{children}</a>

const navBarStyles = {
  position: 'fixed',
  bottom: '0px'
}

export const BottomNav = ({ onChange, location, children }) =>
  <div className={`ui inverted secondary pointing blue ${NUMS[children.length]} item menu`} style={navBarStyles}>
    {children}
  </div>

const navContainerStyles = {
  paddingBottom: '4rem',
  paddingTop: '1rem'
}

export const NavContainer = ({ children }) => <div style={navContainerStyles}>
  {children}
</div>
