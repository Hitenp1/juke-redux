import React from 'react';

class Albums extends React.Component {

	convertSong (song) {
  	song.audioUrl = `/api/songs/${song.id}/audio`;
  	return song;
	}

	convertAlbum (album) {
	  album.imageUrl = `/api/albums/${album.id}/image`;
	  album.songs = album.songs.map(song => this.convertSong(song));
	  return album;
	}

	componentDidMount () { // has loadAlbums on props, got it from AlbumsContainer via connect
    fetch('/api/albums')
      .then(albumArr => {
      	return albumArr.json()
      })
      .then(albumArrJSON => {
      	return this.props.loadAlbums(albumArrJSON.map(album => this.convertAlbum(album)))
      })
  } // this = Albums


	render() {
		return (
			<div>
			  <h3>Albums</h3>
			  <div className="row">
			    {
			    	this.props.albums.map(album => (
					    <div className="col-xs-4" key={ album.id }>
					      <a className="thumbnail" href="#">
					        <img src={ album.imageUrl } />
					        <div className="caption">
					          <h5>
					            <span>{ album.name }</span>
					          </h5>
					          <small>{ album.songs.length } songs</small>
					        </div>
					      </a>
					    </div>
			    	))
			    }		    
			  </div>
			</div>
		)
	}
}


export default Albums
