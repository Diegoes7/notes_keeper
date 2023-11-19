import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Dropdown from './dropdown'

const HamburgerMenu = () => {
	const loc = useLocation()
	const [show, setShow] = useState<boolean>(false)

	return (
		<>
			<Link
				onClick={() => setShow(!show)}
				to={`${loc.pathname}`}
				role='button'
				className={`navbar-burger burger ${show ? 'is-active' : ''}`}
				aria-label='menu'
				aria-expanded='false'
				data-target='navbar-basic'
			>
				<span aria-hidden='true'></span>
				<span aria-hidden='true'></span>
				<span aria-hidden='true'></span>
			</Link>
			{show ? <Dropdown /> : ''}
		</>
	)
}

export default HamburgerMenu
