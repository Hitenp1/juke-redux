import { connect } from 'react-redux';
import React from 'react';
import Albums from './Albums';
import { fetchAlbumsFromServer, showAlbum } from './ReduxApp'


// Actions
import { getAlbumsFromServer } from './ReduxApp';

const mapStateToProps = (state, propsOnStatefulComponent) => ({	
		albums: state.albums,
		album: state.album
})

const mapDispatchToProps = (dispatch, propsOnStatefulComponent) => ({
	loadAlbums: () => dispatch(fetchAlbumsFromServer()),
	showAlbum: (album)  => dispatch(showAlbum(album))
})

const AlbumsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Albums);

export default AlbumsContainer




// function connect (mapStateToProps, mapDispatchToProps) => 
// 	fnThatTakesAComponent => newComponent