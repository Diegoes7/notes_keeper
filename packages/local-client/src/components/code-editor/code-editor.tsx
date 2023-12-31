import { useRef } from 'react'
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
import codeShift from 'jscodeshift'
import Highlighter from 'monaco-jsx-highlighter'
import './code-editor.css'
import './syntax.css'

interface CodeEditorProps {
	initialValue: string
	onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
	const editorRef = useRef<any>()
	const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
		editorRef.current = monacoEditor
		//! reference to the editor, getValue() = get current value out of the editor
		monacoEditor.onDidChangeModelContent(() => {
			onChange(getValue())
		})
		monacoEditor.getModel()?.updateOptions({ tabSize: 2 })

		const highlighter = new Highlighter(
			//@ts-ignore
			window.monaco,
			codeShift,
			monacoEditor
		)
		highlighter.highLightOnDidChangeModelContent(
			() => {},
			() => {},
			undefined,
			() => {}
		)
	}

	const onFormatClick = () => {
		// get current value form editor
		const unformatted = editorRef.current.getModel().getValue()
		// format that value
		const formatted = prettier
			.format(unformatted, {
				parser: 'babel',
				plugins: [parser],
				useTabs: false,
				semi: true,
				singleQuote: true,
			})
			.replace(/\n$/, '')
		// set formatted value back in the editor
		editorRef.current.setValue(formatted)
	}

	return (
		<div className='editor-wrapper'>
			<button
				className='button button-format is-primary is-outlined is-inverted is-rounded has-text-weight-bold'
				onClick={onFormatClick}
			>
				Format
			</button>
			<MonacoEditor
				editorDidMount={onEditorDidMount}
				value={initialValue}
				language='javascript'
				height='100%'
				theme='dark'
				options={{
					wordWrap: 'on',
					minimap: { enabled: false },
					showUnused: false,
					folding: false,
					lineNumbersMinChars: 3,
					fontSize: 16,
					scrollBeyondLastLine: false,
					automaticLayout: true,
				}}
			/>
		</div>
	)
}

export default CodeEditor
