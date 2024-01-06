import { Link } from 'react-router-dom'

const NavbarItems = () => {
	return (
		<div id='main-nav' className='navbar-menu'>
			<div className='navbar-end '>
				<div className='navbar-item-all'>
					<Link to='/code' className='navbar-item'>
						Code
					</Link>
					<Link to='/text' className='navbar-item'>
						Text 
					</Link>
          <Link to='/help' className='navbar-item'>
						Help
					</Link>
				</div>
			</div>
		</div>
	)
}

export default NavbarItems
