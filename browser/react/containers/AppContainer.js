'use strict';

import React, { Component } from 'react';

import initialState from '../initialState';
import AUDIO from '../audio';

import Sidebar from '../components/Sidebar';
import Album from '../components/Album';
import Player from '../components/Player';

import AlbumsContainer from '../../redux/AlbumsContainer';
import { play, pause, load, startSong, toggleOne, toggle } from '../../redux/ReduxApp';

import {connect} from 'react-redux'; 

const convertSong = song => {
  song.audioUrl = `/api/songs/${song.id}/audio`;
  return song;
};

const convertAlbum = album => {
  album.imageUrl = `/api/albums/${album.id}/image`;
  album.songs = album.songs.map(convertSong);
  return album;
};

const mod = (num, m) =>((num % m) + m) % m;

const skip = (interval, { currentSongList, currentSong }) => {
  let idx = currentSongList.map(song => song.id).indexOf(currentSong.id);
  idx = mod(idx + interval, currentSongList.length);
  const next = currentSongList[idx];
  return [next, currentSongList];
};

const mapStateToProps = (state) => ({
  currentSong: state.currentSong,
  currentSongList: state.currentSongList,
  isPlaying: state.isPlaying
})

const mapDispatchToProps = (dispatch) => ({
  play: () => dispatch(play()),
  pause: () => dispatch(pause()),
  load: (currentSong, currentSongList) => dispatch(load(currentSong, currentSongList)),
  startSong: (song, list) => dispatch(startSong(song, list)),
  toggleOne: (selectedSong, selectedSongList) => dispatch(toggleOne(selectedSong, selectedSongList)),
  toggle: () => dispatch(toggle())

})


class AppContainer extends Component {

  constructor (props) {
    super(props);
    this.state = initialState;
    
    //this.toggle = this.toggle.bind(this);
   // this.toggleOne = this.toggleOne.bind(this);
   this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  componentDidMount () {
    fetch('/api/albums/1')
      .then(res => res.json())
      .then(album => this.onLoad(convertAlbum(album)));
    
    AUDIO.addEventListener('ended', () => 
      this.next());
    AUDIO.addEventListener('timeupdate', () => 
      this.setProgress(AUDIO.currentTime / AUDIO.duration));
  }

  onLoad (album) {
    this.setState({ album });
  }

  next () {
    this.startSong(...skip(1, this.state));
  }

  prev () {
    this.startSong(...skip(-1, this.state));
  }

  seek (decimal) {
    AUDIO.currentTime = AUDIO.duration * decimal;
    this.setProgress(AUDIO.currentTime / AUDIO.duration);
  }

  setProgress (progress) {
    this.setState({ progress });
  }

  render () {
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar />
        </div>
        <div className="col-xs-10">
          <AlbumsContainer />
        </div>
        <Player
          currentSong={this.props.currentSong}
          currentSongList={this.props.currentSongList}
          isPlaying={this.props.isPlaying}
          progress={this.state.progress}
          next={this.next}
          prev={this.prev}
          toggle={this.props.toggle}
          scrub={evt => this.seek(evt.nativeEvent.offsetX / evt.target.clientWidth)} 
        />
      </div>
    );
  }
}

const NewAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)

export default NewAppContainer;




     // <Album 
     //      album={this.props.album}
     //      currentSong={this.props.currentSong}
     //      isPlaying={this.props.isPlaying}
     //      toggleOne={this.props.toggleOne} />

