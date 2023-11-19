import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './state'
import { Navbar } from './components/navbar'

import 'bulmaswatch/solar/bulmaswatch.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

export default function App() {
	return (
		<>
			<Provider store={store}>
				<Navbar />
				<Outlet />
			</Provider>
		</>
	)
}
