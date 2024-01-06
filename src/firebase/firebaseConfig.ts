import { initializeApp } from 'firebase/app'
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	getFirestore,
	setDoc,
} from 'firebase/firestore'
import { Cell } from '../state'

// firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCj4kOowjZOhkk9Ap36qydWog5l6sGxDhc',
	authDomain: 'notes-keeper-267ed.firebaseapp.com',
	projectId: 'notes-keeper-267ed',
	storageBucket: 'notes-keeper-267ed.appspot.com',
	messagingSenderId: '1027635047413',
	appId: '1:1027635047413:web:45ff3684d5f9f33dcd8ebc',
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)

const cellsCollection = collection(db, 'cells')


export async function fetchCellsDocument() {
	// Use Firebase Firestore to get data from 'cells' collection
	const querySnapshot = await getDocs(cellsCollection)

	// Map the documents to an array of cells
	const data: Cell[] = querySnapshot.docs.map((doc) => doc.data() as Cell)
	return data
}

export async function addCellDocument(cell: Cell) {
	const docRef = doc(cellsCollection, cell.id)
	await setDoc(docRef, { ...cell })
}

export async function deleteCellFromBackend(id: string) {
	try {
		//a reference to your Firestore database ('db') and a collection name ('your_collection')
		const documentIdToDelete = id
		// Create a document reference with the specified document ID
		const docRef = doc(cellsCollection, documentIdToDelete)
		// Delete the document
		await deleteDoc(docRef)
		console.log('Document deleted successfully')
	} catch (error) {
		console.error('Error deleting document:', error)
	}
}
