import React from 'react';
import cx from 'classnames';
import Player from '../player';
import { PlayIconSvg, PauseIconSvg } from './icons';

const { PropTypes, Component } = React;

class Playback extends Component {
  static propTypes = {
    playing: PropTypes.bool,
    seeking: PropTypes.bool,
    player: PropTypes.instanceOf(Player),
    className: PropTypes.string,
  };

  static defaultProps = {
    playing: false,
    seeking: false,
  };

  shouldComponentUpdate(nextProps) {
    let { playing, seeking } = this.props;
    return (playing !== nextProps.playing || seeking !== nextProps.seeking);
  }

  handleClick = () => {
    let { playing, player } = this.props;

    if (!playing) {
      player && player.play();
    } else {
      player && player.pause();
    }
  }

  render() {
    let iconNode;
    let { playing, seeking, className } = this.props;
    let classNames = cx('rp-playback', className);

    if (playing || seeking) {
      iconNode = <PauseIconSvg />;
    } else {
      iconNode = <PlayIconSvg />;
    }

    return (
      <div className={classNames}>
        <button className="rp-control" onClick={this.handleClick}>
          {iconNode}
        </button>
      </div>
    );
  }
}

export default Playback;
