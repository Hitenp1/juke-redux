import { connect } from 'react-redux';

const mapStateToProps = (state, propsOnStatefulComponent) => ({	
		albums: state.albums
})

const mapDispatchToProps = (dispatch, propsOnStatefulComponent) => ({
	getAlbumsFromServer: (albums) => dispatch(getAlbumsFromServer(albums))
})


const AlbumsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Albums);

export default AlbumsContainer




// function connect (mapStateToProps, mapDispatchToProps) => 
// 	fnThatTakesAComponent => newComponent