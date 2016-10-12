import { connect } from 'react-redux';
import React from 'react';
import Albums from './Albums';
import {fetchAlbumsFromServer} from './ReduxApp'


// Actions
import { getAlbumsFromServer } from './ReduxApp';

const mapStateToProps = (state, propsOnStatefulComponent) => ({	
		albums: state.albums
})

const mapDispatchToProps = (dispatch, propsOnStatefulComponent) => ({
	loadAlbums: () => dispatch(fetchAlbumsFromServer())
})

const AlbumsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Albums);

export default AlbumsContainer




// function connect (mapStateToProps, mapDispatchToProps) => 
// 	fnThatTakesAComponent => newComponent