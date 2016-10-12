import { connect } from 'react-redux';
import React from 'react';
import Albums from './Albums';



// Actions
import { getAlbumsFromServer } from './ReduxApp';

const mapStateToProps = (state, propsOnStatefulComponent) => ({	
		albums: state.albums
})

const mapDispatchToProps = (dispatch, propsOnStatefulComponent) => ({
	loadAlbums: (albums) => dispatch(getAlbumsFromServer(albums))
})

const AlbumsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Albums);

export default AlbumsContainer




// function connect (mapStateToProps, mapDispatchToProps) => 
// 	fnThatTakesAComponent => newComponent