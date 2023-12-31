import express from 'express'
import path from 'path'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { createCellsRouter } from './routes/cells'

export const serve = (
	port: number,
	filename: string,
	dir: string,
	useProxy: boolean
) => {
	const app = express()

	app.use(createCellsRouter(filename, dir))

	if (useProxy) {
		app.use(
			createProxyMiddleware({
				target: 'http://127.0.0.1:3000',
				ws: true,
				logLevel: 'silent',
			})
		)
	} else {
		const packagePath = require.resolve(
			'@notes_keeper/local-client/build/index.html'
		)
		app.use('/', express.static(path.dirname(packagePath)))

		app.get('*', (req, res) => {
			res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
		})
	}

	return new Promise<void>((resolve, reject) => {
		app.listen(port, resolve).on('error', reject)
	})
}

//! Listen to a port is a asynchronous operation in express
//* takes some amount of time to start listening to a port and realize the port is in use
