import React from 'react'
import { Link } from 'react-router-dom'
import raven from './grunge-crow.jpg'
import HamburgerMenu from './hamburger-menu'
import NavbarItems from './navbar-items'

import './navbar.css'
// import Dropdown from './dropdown'

export const Navbar = () => {
	// const [state, setState] = React.useState<boolean>(false)
	return (
		<div>
			<nav className='navbar' role='navigation' aria-label='main navigation'>
				<div className='navbar-brand'>
					<div className='picture'>
						<Link to='/'>
							<img className='raven_img' src={raven} alt='raven' />
						</Link>
					</div>
					<span className='title'>Welcome in Myrkviðr</span>
				</div>
				<HamburgerMenu />
				<NavbarItems />
			</nav>
		</div>
	)
}
