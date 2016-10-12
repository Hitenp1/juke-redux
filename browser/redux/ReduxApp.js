// Import Redux Fns
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';


// Import Initial State
import initialState from '../react/initialState';

// const initialState = {
//   albums: [],
//   album: {},
//   currentSong: {},
//   currentSongList: [],
//   isPlaying: false,
//   progress: 0
// };


//Helper functions for albums

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


// Actions
export const getAlbumsFromServer = (albums) => ({

	type: GET_ALBUMS_FROM_SERVER,
	albums

})

export const fetchAlbumsFromServer =() => {
  return dispatch => {
    fetch('/api/albums')
      .then(res => res.json())
      .then(albumArrJSON => albumArrJSON.map(album => convertAlbum(album)))
      // use the dispatch method the thunkMiddleware gave us
      .then(albums => dispatch(getAlbumsFromServer(albums))) 
      .catch(err => console.log(err))
  }
}






//Middelware 

const logger = createLogger();

const appliedMiddleware = applyMiddleware(thunkMiddleware ,logger);


// Reducers
const reducer = (prevState = initialState, action) => {

	switch (action.type) {
		case 'GET_ALBUMS_FROM_SERVER':
			return Object.assign({}, prevState, { albums: action.albums })
		default:
			return prevState

	}
}

let store = createStore(reducer, appliedMiddleware);

export default store
