import React from 'react';
import cx from 'classnames';
import Player from '../player';
import { Speaker, SpeakerVolume } from './icons';

const { PropTypes, Component } = React;

class Volume extends Component {
  static propTypes = {
    volume: PropTypes.number,
    player: PropTypes.instanceOf(Player),
    className: PropTypes.string,
  }

  shouldComponentUpdate(nextProps) {
    let { volume } = this.props;
    return (volume !== nextProps.volume);
  }

  onVolumeChange = () => {}

  onVolumeInput = (e) => {
    let { player } = this.props;
    player && player.volume(e.target.value / 100);
  }

  onVolumeMute = () => {
    let { volume, player } = this.props;
    player && player.mute(volume);
  }

  render() {
    let iconNode;
    let { volume, className } = this.props;
    const classNames = cx('rp-volume', className);

    if (volume > 0) {
      iconNode = <SpeakerVolume />
    } else {
      iconNode = <Speaker />
    }

    return (
      <div className={classNames}>
        <button className="rp-control rp-volume-button" onClick={this.onVolumeMute}>
          {iconNode}
        </button>
        <div className="rp-control rp-volume-slider">
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={this.onVolumeChange}
            onInput={this.onVolumeInput} />
        </div>
      </div>
    );
  }
}

export default Volume;
