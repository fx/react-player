import React from 'react';
import cx from 'classnames';
import Player from '../player';

const { PropTypes, Component } = React;

class Progress extends Component {
  static propTypes=  {
    buffered: PropTypes.number,
    progress: PropTypes.number,
    player: PropTypes.instanceOf(Player),
    className: PropTypes.string,
  }

  static defaultProps = {
    buffered: 0,
    progress: 0,
  }

  shouldComponentUpdate(nextProps) {
    let { buffered, progress } = this.props;
    return (buffered !== nextProps.buffered || progress !== nextProps.progress);
  }

  handleSeek = (e) => {
    e.preventDefault();
    let { player } = this.props;
    if (player && !isNaN(player.video.duration)) {
        player.seek(e);
    }
  }

  render() {
    let { buffered, progress, className } = this.props;

    if (progress < 0) {
      progress = 0;
    }
    if (progress > 100) {
      progress = 100;
    }

    let barStyle = {width: `${progress}%`};
    let bufferStyle = {width: `${buffered}%`};
    const classNames = cx('rp-progress', className);

    return (
      <div
        className={classNames}
        onClick={this.handleSeek}>
        <div className="rp-progress-bar" style={barStyle}>
          <div className="rp-progress-scrub" />
        </div>
        <div className="rp-progress-buffer" style={bufferStyle} />
      </div>
    );
  }
}

export default Progress;
