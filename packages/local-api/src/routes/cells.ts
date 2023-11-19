import express from 'express'
import fs from 'fs/promises' //saving and loading files from hard drive, is async/await structure, NOT callback functions
import path from 'path'

interface Cell {
	id: string
	content: string
	type: 'text' | 'code'
}

interface LocalApiError {
	code: string
}

export const createCellsRouter = (filename: string, dir: string) => {
	const router = express.Router()
	router.use(express.json()) // body parser middleware, convert information to JSON

	const fullPath = path.join(dir, filename)

	router.get('/cells', async (req, res) => {
		const isLocalApiError = (error: any): error is LocalApiError => {
			return typeof error.code === 'string'
		}
		try {
			//* Read the file
			const result = await fs.readFile(fullPath, { encoding: 'utf-8' })
			res.send(JSON.parse(result))
		} catch (error) {
			if (isLocalApiError(error)) {
				//* if throw error, inspect the error, if says NOT exists
				if (error.code === 'ENOENT') {
					//* Add file and add default cells
					await fs.writeFile(fullPath, '[]', 'utf-8')
					res.send([])
				} else {
					throw error
				}
			}
		}
		//* Parse list of cells out of it
		//* Send list of cells back to browser
	})

	router.post('/cells', async (req, res) => {
		//* Make sure the cells file exists, if it does not make one - !make for us automatically

		//* Take the list cells from the request {}
		//* serialize them, etc. put the cells in it
		const { cells }: { cells: Cell[] } = req.body
		//* Write the cells into the file
		await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8')
		res.send({ status: 'ok' })
	})
	return router
}
