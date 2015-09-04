import React from 'react';
import cx from 'classnames';

const { PropTypes, Component } = React;

class Video extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    poster: PropTypes.string,
    className: PropTypes.string,
  }

  render() {
    const { url, poster, className } = this.props;
    const videoClassName = cx('rp-video', className);

    return (
      <video
        className={videoClassName}
        poster={poster}>
        <source src={url} />
      </video>
    );
  }
}

export default Video;
