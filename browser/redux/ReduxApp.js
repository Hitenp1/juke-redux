// Import Redux Fns
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';


// Import Initial State
import initialState from '../react/initialState';


// Imports from React AppContainer
import AUDIO from '../react/audio';

// const initialState = {
//   albums: [],
//   album: {},
//   currentSong: {},
//   currentSongList: [],
//   isPlaying: false,
//   progress: 0
// };


//Helper functions
const convertSong = (song) => {
  song.audioUrl = `/api/songs/${song.id}/audio`;
  return song;
	}

const convertAlbum = (album) => {
	album.imageUrl = `/api/albums/${album.id}/image`;
	album.songs = album.songs.map(song => convertSong(song));
	  return album;
	}




// Action Types
const GET_ALBUMS_FROM_SERVER = 'GET_ALBUMS_FROM_SERVER';
const PLAY = 'PLAY';
const PAUSE = 'PAUSE';
const LOAD = 'LOAD';
const START_SONG = 'START_SONG';
const TOGGLE_ONE = 'TOGGLE_ONE';
const TOGGLE = 'TOGGLE';
const SHOW_ALBUM = 'SHOW_ALBUM';



// Synchronous Actions
export const getAlbumsFromServer = (albums) => ({
	type: GET_ALBUMS_FROM_SERVER,
	albums
})

export const doStart = () => ({
	type: PLAY
})

export const doPause = () => ({
	type: PAUSE
})

export const doLoad = (currentSong, currentSongList) => ({
	type: LOAD,
	currentSong,
	currentSongList
})

export const doStartSong = (song, list) => {
	type: START_SONG,
	song,
	list
}

export const doToggleOne = (selectedSong, selectedSongList) => {
	type: TOGGLE_ONE,
	selectedSong,
	selectedSongList
}

export const doToggle = () => {
	type: TOGGLE
}

export const showAlbum = (album) => ({
	type: SHOW_ALBUM,
	album
})



// Async Actions

export const fetchAlbumsFromServer = () => {
  return (dispatch) => {
    fetch('/api/albums')
      .then(res => res.json())
      .then(albumArrJSON => albumArrJSON.map(album => convertAlbum(album)))
      // use the dispatch method the thunkMiddleware gave us
      .then(albums => dispatch(getAlbumsFromServer(albums))) 
      .catch(err => console.log(err))
  }
}

export const play = () => {
	return (dispatch) => {
		AUDIO.play();
		dispatch(doPlay());
	}
}

export const pause = () => {
	return (dispatch) => {
		AUDIO.pause();
		dispatch(doPause());
	}
}

export const load = (currentSong, currentSongList) => {
	return (dispatch) => {
		AUDIO.src = currentSong.audioUrl;
		AUDIO.load();
		dispatch(doLoad(currentSong, currentSongList));
	}
}

export const startSong = (song, list) => {
	return (dispatch) => {
		dispatch(doPause());
		dispatch(doLoad(song, list));
		dispatch(doPlay());
	}
}

export const toggleOne = (selectedSong, selectedSongList) => {
	return (dispatch, getState) => {
		const { currentSong } = getState();
		if (currentSong.id === selectedSong.id) {
			dispatch(doStartSong(selectedSong, selectedSongList))
		} else {
			dispatch(doToggle());
		}
	}
}

export const toggle = () => {
	return (dispatch, getState) => {
		const { isPlaying } = getState();
		if (isPlaying) {
			dispatch(doPause());
		} else {
			dispatch(doPlay());
		}
	}
}



//Middleware 

const logger = createLogger();
const appliedMiddleware = applyMiddleware(thunkMiddleware, logger);


// Reducers
const albumsReducer = (prevState = [], action) => {
	switch (action.type) {
		case 'GET_ALBUMS_FROM_SERVER':
			return action.albums;
		default:
			return prevState;
	}
}

const albumReducer = (prevState = {}, action) => {
 	switch (action.type) {
 		case "SHOW_ALBUM":
 			return action.album;
 		default:
 			return prevState;
 	}
}

const currentSongReducer = (prevState = {}, action) => {
	switch (action.type) {
		case 'LOAD':
			return action.currentSong;
		default:
			return prevState;
	}
}

const currentSongListReducer = (prevState = [], action) => {
	switch (action.type) {
		case 'LOAD':
			return action.currentSongList;
		default:
			return prevState;
	}
}

const isPlayingReducer = (prevState = false, action) => {
	switch (action.type) {
		case 'PLAY':
			return true;
		case 'PAUSE':
			return false;
		default:
			return prevState
	}
}

// const progressReducer = (prevState = 0, action) => {
// 	return
// }

// ROOT REDUCER
const rootReducer = combineReducers({
	albums: albumsReducer,
	album: albumReducer,
	currentSong: currentSongReducer,
	currentSongList: currentSongListReducer,
	isPlaying: isPlayingReducer,
	//progress: progressReducer
})


let store = createStore(rootReducer, appliedMiddleware);

export default store
