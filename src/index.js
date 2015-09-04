import React from 'react';
import cx from 'classnames';
import assign from 'object-assign';

import Player from './player';
import Video from './components/video';
import Idle from './components/idle';
import Playback from './components/playback';
import Volume from './components/volume';
import Timer from './components/timer';
import Progress from './components/progress';
import FullScreen from './components/fullscreen';

const { Component, PropTypes, findDOMNode } = React;

class PlayerContainer extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    poster: PropTypes.string,
  };

  static defaultProps = {
    playing: false,
    seeking: false,
    fullscreen: false,
    volume: 0.5,
    duration: 0,
    currentTime: 0,
    buffered: 0,
    progress: 0,
  }

  constructor(props, context) {
    super(props, context);

    const {url} = props;
    if (!url) {
      throw new Error('Please specify a valid url.');
    }

    this.timeout = null;
    this.player = null;
    this.state = props;
  }

  componentDidMount() {
    const { volume } = this.state;
    const video = findDOMNode(this.refs.video);

    this.player = new Player(video);
    this.player.volume(volume);

    this.player.on('duration', this.onVideoDuration);
    this.player.on('update', this.onVideoUpdate);
    this.player.on('buffer', this.onVideoBuffer);
    this.player.on('volume', this.onVideoVolume);
    this.player.on('fullscreen', this.onVideoFullscreen);
    this.player.on('play', this.onVideoPlay);
    this.player.on('pause', this.onVideoPause);
    this.player.on('seeking', this.onVideoSeeking);
    this.player.on('seeked', this.onVideoSeeking);
    this.player.on('stop', this.onVideoEnded);
  }

  componentDidReceiveProps(nextProps) {
    const { player } = this;
    const playedBefore = this.state.playing;

    function replay() {
      if (playedBefore) {
        player.play();
      }
    }

    if(nextProps.playing !== this.state.playing) {
      player.stop();
      replay();
    }
  }

  componentWillUnmount() {
    this.player.unbindAll();
  }

  onVideoDuration = ({data}) => {
    this.setState({
      duration: data,
    });
  }

  onVideoUpdate = ({data}) => {
    this.setState({
      currentTime: data.currentTime,
      progress: data.progress,
    });
  }

  onVideoBuffer = ({data}) => {
    this.setState({
      buffered: data,
    })
  }

  onVideoVolume = ({data}) => {
    this.setState({
      volume: data,
    });
  }

  onVideoFullscreen = ({data}) => {
    this.setState({
      fullscreen: data.fullscreen,
    });
  }

  onVideoPlay = ({data}) => {
    this.setState({
      playing: data,
    });
  }

  onVideoPause = ({data}) => {
    this.setState({
      playing: data,
    });
  }

  onVideoSeeking = ({data}) => {
    this.setState({
      seeking: data,
    });
  }

  onVideoEnded = ({data}) => {
    this.setState({
      playing: data.playing,
      currentTime: data.currentTime,
    });
  }


  renderControls() {
    const controlProps = assign({}, {player: this.player}, this.state);

    return (
      <div className="rp-overlay">
        <Idle {...controlProps} />
        <div className="rp-toolbar">
          <div className="rp-gradient" />
          <Progress {...controlProps} />
          <div className="rp-controls">
            <Playback {...controlProps} />
            <Volume {...controlProps} />
            <Timer {...controlProps} />
            <FullScreen {...controlProps} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    let { url, poster, className } = this.props;
    const classNames = cx('rp-container', className);

    return (
      <div className={classNames}>
        <Video ref="video" url={url} poster={poster}/>
        {this.renderControls()}
      </div>
    );
  }
}

export default PlayerContainer;
