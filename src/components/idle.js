import React from 'react';
import cx from 'classnames';
import Player from '../player';

const { PropTypes, Component } = React;

class Idle extends Component {
  static propTypes = {
    playing: PropTypes.bool,
    player: PropTypes.instanceOf(Player),
    className: PropTypes.string,
  }

  shouldComponentUpdate() {
    return false;
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
    let { className } = this.props;
    const classNames = cx('rp-idle', className);

    return (
      <div className={classNames} onClick={this.handleClick} />
    );
  }
}

export default Idle;
