import React from 'react';
import Player from 'react-player';

const { Component } = React;
const options = {
  url: 'http://videos.thisisepic.com/2b9c1bf3-e19b-4be5-9d36-246c5d3607d8/high.mp4',
  poster: 'http://thumbnails.thisisepic.com/b1ce00de-e687-4c1b-97ac-afa05a287327/large/frame_0005.png',
};

export default class VideoPlayer extends Component {
  render() {
    return (
      <Player {...options} />
    );
  }
}
