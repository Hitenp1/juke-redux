// Import Redux Fns
import { createStore } from 'redux';

// Import Initial State
import initialState from '../react/initialState';
console.log(initialState);

// const initialState = {
//   albums: [],
//   album: {},
//   currentSong: {},
//   currentSongList: [],
//   isPlaying: false,
//   progress: 0
// };


// Action Types
const GET_ALBUMS_FROM_SERVER = 'GET_ALBUMS_FROM_SERVER';


// Actions
const getAlbumsFromServer = (albums) => ({

	type: GET_ALBUMS_FROM_SERVER,
	albums

})


// Reducers
const reducer = (prevState = initialState, action) => {

	switch (action.type) {
		case 'GET_ALBUMS_FROM_SERVER':
			return Object.assign({}, prevState, { albums: action.albums })
		default:
			return prevState

	}
}

let store = createStore(reducer)

export default store
