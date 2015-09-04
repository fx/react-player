import React from 'react';
import cx from 'classnames';
import Player from '../player';
import { FullScreenIconSvg, FullScreenExitIconSvg } from './icons';

const { PropTypes, Component } = React;

class FullScreen extends Component {
  static propTypes = {
    fullscreen: PropTypes.bool,
    player: PropTypes.instanceOf(Player),
    className: PropTypes.string,
  }

  static defaultProps = {
    fullscreen: false,
  }

  handleFullScreen = (e) => {
    e.preventDefault();
    let { player } = this.props;
    player.fullscreen();
  }

  render() {
    let iconNode;
    let { fullscreen, className } = this.props;
    const classNames = cx('rp-fullscreen', className);

    if (!fullscreen) {
      iconNode = <FullScreenIconSvg />
    } else {
      iconNode = <FullScreenExitIconSvg />
    }

    return (
      <div className={classNames}>
        <button className="rp-control" onClick={this.handleFullScreen}>
          {iconNode}
        </button>
      </div>
    );
  }
}

export default FullScreen;
