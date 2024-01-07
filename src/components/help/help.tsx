import React from 'react'
import CodeCell from '../code-cell/code-cell'
import './help.css'
import { Cell } from '../../state/cell'
import TextEditor from '../text-editor/text-editor'
import CopyCode from '../copy-code/copy-code'

const Help = () => {
	return (
		<div className='help-container'>
			<section className='section'>
				<h1 className='title-help'>Run the App</h1>
				<p className='paragraph'>
					Where does it come from? Contrary to popular belief, Lorem Ipsum is
					not simply random text. It has roots in a piece of classical Latin
					literature from 45 BC, making it over 2000 years old. Richard
					McClintock, a Latin professor at Hampden-Sydney College in Virginia,
					looked up one of the more obscure Latin words, consectetur, from a
					Lorem Ipsum passage, and going through the cites of the word in
					classical literature, discovered the undoubtable source. Lorem Ipsum
					comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
					Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
				</p>
				<div className='help-code-fields'>
					<CopyCode
						text='npm run start'
						info='Start front end development only:'
					/>
					<CopyCode
						text='node index.js serve'
						info='Start the App:'
						additionalInfo='You need to be in ../packages/cli/dist to execute the command.'
					/>
					<CopyCode
						text='npx notes_keeper serve'
						info='Get the app from npmjs.com'
						additionalInfo='Need to have a nodejs environment in your operating system'
					/>
				</div>
			</section>

			<section className='section'>
				<h2 className='title-help'>Example of Code Editor</h2>
				<CodeCell cell={exampleCodeCell} />
			</section>
			<section className='section'>
				<h2 className='title-help'>Example of Text Editor</h2>
				<h2 className='title-help'>Need to click on it to start typing</h2>
				<TextEditor cell={exampleTextCell} />
			</section>
		</div>
	)
}

export default Help

const exampleCodeCell: Cell = {
	content:
		"import React from 'react'\r\nimport ReactDOM from 'react-dom'\r\n\r\nconst App = () => {\r\n  return (\r\n    <div>\r\n    Hello, there, I am React editor.\r\n    </div>\r\n  )\r\n}\r\n\r\nReactDOM.createRoot(document.getElementById('root'))\r\n.render(<App/>)\r\n\r\n",
	type: 'code',
	id: 'ec4r6',
	date: 'last updated at 10/21/2023 11:57:55 am',
}

const exampleTextCell: Cell = {
	content:
		'# Hi I am text editor.\nYou can write your notes here, save it automatically and use it later!',
	type: 'text',
	id: '2gqs8',
	date: 'last updated at 10/21/2023 12:51:50 pm',
}

// { cell: { id, content, date } }
//TODO: Testing store and actions //
// store.dispatch({
// 	type: ActionType.INSERT_CELL_AFTER,
// 	payload: {
// 		id: null,
// 		type: 'code',
// 	},
// })

// store.dispatch({
// 	type: ActionType.INSERT_CELL_AFTER,
// 	payload: {
// 		id: null,
// 		type: 'text',
// 	},
// })

// store.dispatch({
// 	type: ActionType.INSERT_CELL_AFTER,
// 	payload: {
// 		id: null,
// 		type: 'code',
// 	},
// })

// store.dispatch({
// 	type: ActionType.INSERT_CELL_AFTER,
// 	payload: {
// 		id: null,
// 		type: 'text',
// 	},
// })

// const id = store.getState().cells?.order[0]

// console.log(store.getState())
