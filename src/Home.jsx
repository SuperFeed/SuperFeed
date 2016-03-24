import React from 'react'
import Login from './Login'

const styles = {
  masthead: {
    backgroundImage: 'url(/hero-bg-01.jpg)',
    backgroundSize: 'cover',
    height: '98vh',
    marginBottom: '3rem'
  },
  banner: { paddingTop: '10rem' },
  h1: { fontSize: '4rem' },
  h2: { fontSize: '1.5rem' },
  footer: { marginTop: '2rem' }
}

export default function Home () {
  return <div>
    <div className='ui inverted vertical masthead center aligned segment' style={styles.masthead}>
      <div className='ui text container' style={styles.banner}>
        <h1 className='ui inverted header' style={styles.h1}>SuperFeed</h1>
        <h2 style={styles.h2}>Community-focued hyperlocal social media feed</h2>
        <br />
        <Login auto={false} />
      </div>
    </div>

    <div className='ui container'>
      <div className='ui vertical stripe segment'>
        <div className='ui equal width stackable grid'>
          <div className='center aligned row'>
            <div className='column'>
              <h2 className='ui center aligned icon header'>
                <i className='circular calendar icon'></i>
                Events
              </h2>
              <p>SuperFeed tracks events around you. Whether it's tracked on SuperFeed, or made on Facebook, SuperFeed will let you know what's going on.</p>
            </div>
            <div className='column'>
              <h2 className='ui center aligned icon header'>
                <i className='circular home icon'></i>
                Community
              </h2>
              <p>Connect with your community with SuperFeed! SuperFeed gived people around you information about local events, parties, and other fun things.</p>
            </div>
            <div className='column'>
              <h2 className='ui center aligned icon header'>
                <i className='circular users icon'></i>
                Friends
              </h2>
              <p>See what's up with your friends! SuperFeed lets you find where you want to go tonight, tomorrow, and every day to come. Connect with friends by joining them!</p>
            </div>
          </div>
        </div>
      </div>

      <div className='ui vertical stripe center aligned padded segment'>
        <h2>SuperFeed</h2>
        <p>SuperFeed is a social network that lets users share hyperlocal information. SuperFeed also pulls in data from other apps to broaden the scope of what you can normally see. Create events, share images, and let people know what's going on, right here, with SuperFeed.</p>
      </div>
    </div>

    <div className='ui inverted vertical footer segment' style={styles.footer}>
      <div className='ui container'>
        <div className='ui stackable inverted divided equal height stackable grid'>
          <div className='three wide column'>
            <h4 className='ui inverted header'>About</h4>
            <div className='ui inverted link list'>
              <a href='https://github.com/SuperFeed/SuperFeed' className='item'>Source Code</a>
              <a href='http://rdel.io' className='item'>Ryan Delaney</a>
              <a href='#' className='item'>RPI</a>
            </div>
          </div>
          <div className='three wide column'>
            <h4 className='ui inverted header'>Services</h4>
            <div className='ui inverted link list'>
              <a href='#' className='item'>Apps</a>
              <a href='#' className='item'>Terms of Service</a>
              <a href='#' className='item'>Privacy Policy</a>
            </div>
          </div>
          <div className='seven wide column'>
            <h4 className='ui inverted header'>SuperFeed</h4>
            <p>All content on this page is licensed under the MIT license.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
}
