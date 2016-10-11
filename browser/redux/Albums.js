import React from 'react';

class Albums extends React.Component {

componentDidMount () { // Loop through array of albums
    fetch('/api/albums')
      .then(res => res.map(album => album.json()) // did this line
      .then(album => this.onLoad(convertAlbum(album)));
  }


	render() {
		return (
			<div>
			  <h3>Albums</h3>
			  <div className="row">
			    /* start map */

			    <div className="col-xs-4">
			      <a className="thumbnail" href="#">
			        <img src="http://placeholdit.imgix.net/~text?txtsize=33&txt=ALBUMoneIMAGE&w=300&h=300" />
			        <div className="caption">
			          <h5>
			            <span>ALBUM ONE NAME HERE</span>
			          </h5>
			          <small>NUMBER OF SONGS HERE songs</small>
			        </div>
			      </a>
			    </div>
			    
			  </div>
			</div>
		)
	}
}


export default Albums
