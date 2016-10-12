import React from 'react';



class Albums extends React.Component {

  
	componentDidMount () { // has loadAlbums on props, got it from AlbumsContainer via connect		
		this.props.loadAlbums();
	}


	render() {
		return (
			<div>
			  <h3>Albums</h3>
			  <div className="row">
			    {
			    	this.props.albums.map(album => (
					    <div className="col-xs-4" key={ album.id }>
					      <a className="thumbnail" href="#">
					        <img src={ album.imageUrl } onClick={() => this.props.showAlbum(album)} />
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
