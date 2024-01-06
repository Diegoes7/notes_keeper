import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CellList from './components/cell-list/cell-list'
import CodeList from './components/code-list/code-list'
import TextList from './components/text-list/text-list'
import Help from './components/help/help'
import Spinner from './components/spinner/spinner.component'

const App = lazy(() => import('../src/App'))

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Suspense fallback={<Spinner />}>
				<App />
			</Suspense>
		),
		errorElement: 'Error',
		children: [
			{ index: true, element: <CellList /> },
			{ path: 'code', element: <CodeList /> },
			{ path: 'text', element: <TextList /> },
			{ path: 'help', element: <Help /> },
		],
	},
])

export function Routes() {
	return <RouterProvider router={router} />
}
