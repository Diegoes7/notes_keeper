import React from 'react'
import { Link } from 'react-router-dom'

const Dropdown = () => {
	return (
		<nav className='navbar' role='navigation' aria-label='dropdown navigation'>
			<div className='has-dropdown'>
				<div className='navbar-dropdown'>
					<Link to='/code' className='navbar-item'>
						Code
					</Link>
					<Link to='/text' className='navbar-item'>
						Text
					</Link>
					<Link to='help' className='navbar-item'>
						Help
					</Link>
				</div>
			</div>
		</nav>
	)
}

export default Dropdown
