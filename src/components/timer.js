import React from 'react';
import cx from 'classnames';
import Player from '../player';

const { PropTypes, Component } = React;

class Timer extends Component {
  static propTypes = {
    className: PropTypes.string,
    duration: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    currentTime: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    player: PropTypes.instanceOf(Player),
  }

  static defaultProps = {
    duration: 0,
    currentTime: 0,
  }

  static format(time) {
    let hours = Math.floor(time / 3600);
    let mins = '0' + Math.floor((time % 3600) / 60);
    let secs = '0' + Math.floor((time % 60));

    mins = mins.substr(mins.length - 2);
    secs = secs.substr(secs.length - 2);

    if (!isNaN(secs)) {
        if (hours) {
            return `${hours}:${mins}:${secs}`;
        } else {
            return `${mins}:${secs}`;
        }
    } else {
        return '00:00';
    }
  }

  render() {
    let { duration, currentTime, className } = this.props;
    const classname = cx('rp-timer', className);

    return (
      <div className={classname}>
        <div className="rp-control">
         {Timer.format(currentTime) + ' / ' +  Timer.format(duration)}
         </div>
      </div>
    );
  }
}

export default Timer;
