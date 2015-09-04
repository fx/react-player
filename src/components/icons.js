import React from 'react';

const { Component } = React;

class IconSvg extends Component {
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="rp-icon"
        viewBox="0 0 32 32"
        fill="currentColor">
        {this.props.children}
      </svg>
    );
  }
}

class PlayIconSvg extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <IconSvg>
        <path d="M8,6 L24,16 L8,26 L8,6 L8,6 Z"></path>
      </IconSvg>
    );
  }
}

class PauseIconSvg extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <IconSvg>
        <path d="M8,26 L14,26 L14,6 L8,6 L8,26 L8,26 Z M18,6 L18,26 L24,26 L24,6 L18,6 L18,6 Z"></path>
      </IconSvg>
    );
  }
}

class FullScreenIconSvg extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <IconSvg>
        <path d="M6,23.998 L25.996,23.998 L25.996,7.998 L6,7.998 L6,23.998 L6,23.998 Z M9.998,11.998 L21.998,11.998 L21.998,19.998 L9.998,19.998 L9.998,11.998 L9.998,11.998 Z M4,6 L9.998,6 L9.998,4 L2,4 L2,11.998 L4,11.998 L4,6 L4,6 Z M4,19.998 L2,19.998 L2,27.996 L9.998,27.996 L9.998,25.998 L4,25.998 L4,19.998 L4,19.998 Z M21.998,4 L21.998,6 L27.996,6 L27.996,11.998 L29.996,11.998 L29.996,4 L21.998,4 L21.998,4 Z M27.996,25.998 L21.998,25.998 L21.998,27.996 L29.996,27.996 L29.996,19.998 L27.996,19.998 L27.996,25.998 L27.996,25.998 Z"></path>
      </IconSvg>
    );
  }
}

class FullScreenExitIconSvg extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <IconSvg>
        <path d="M5.998,5.998 L2,5.998 L2,7.998 L7.998,7.998 L7.998,2 L5.998,2 L5.998,5.998 L5.998,5.998 Z M2,26.002 L5.998,26.002 L5.998,30 L7.998,30 L7.998,24.002 L2,24.002 L2,26.002 L2,26.002 Z M26.002,5.998 L26.002,2 L24.002,2 L24.002,7.998 L30,7.998 L30,5.998 L26.002,5.998 L26.002,5.998 Z M24.002,30 L26.002,30 L26.002,26.002 L30,26.002 L30,24.002 L24.002,24.002 L24.002,30 L24.002,30 Z M8.002,22 L24,22 L24,10 L8.002,10 L8.002,22 L8.002,22 Z M12,14 L20,14 L20,18 L12,18 L12,14 L12,14 Z"></path>
      </IconSvg>
    );
  }
}

class Speaker extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <IconSvg>
        <path d="M7,12 L3,12 L3,20 L7,20 L15,26 L17,26 L17,6 L15,6 L7,12 L7,12 Z M30,13 L28,11 L25,14 L22,11 L20.031,12.984 L23,16 L20,19 L22,21 L25,18 L28,21 L30,19 L27,16 L30,13 L30,13 Z"></path>
      </IconSvg>
    );
  }
}

class SpeakerVolume extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <IconSvg>
        <path d="M7,12 L3,12 L3,20 L7,20 L15,26 L17,26 L17,6 L15,6 L7,12 L7,12 Z M19.828,13.172 C19.438,12.781 18.804,12.781 18.414,13.172 C18.024,13.563 18.024,14.196 18.414,14.586 C19.195,15.367 19.195,16.633 18.414,17.414 C18.024,17.804 18.024,18.438 18.414,18.828 C18.804,19.218 19.438,19.218 19.828,18.828 C21.39,17.266 21.39,14.733 19.828,13.171 L19.828,13.172 Z M22.657,10.343 C22.267,9.952 21.633,9.952 21.243,10.343 C20.853,10.734 20.853,11.367 21.243,11.757 C23.586,14.1 23.586,17.899 21.243,20.242 C20.853,20.633 20.853,21.266 21.243,21.656 C21.633,22.046 22.267,22.046 22.657,21.656 C25.781,18.532 25.781,13.466 22.657,10.342 L22.657,10.343 Z M25.485,7.515 C25.094,7.124 24.461,7.124 24.071,7.515 C23.681,7.906 23.681,8.539 24.071,8.929 C27.976,12.834 27.976,19.166 24.071,23.071 C23.681,23.462 23.681,24.095 24.071,24.485 C24.461,24.875 25.095,24.876 25.485,24.485 C30.171,19.799 30.171,12.201 25.485,7.514 L25.485,7.515 Z"></path>
      </IconSvg>
    )
  }
}

export default {
  PlayIconSvg,
  PauseIconSvg,
  Speaker,
  SpeakerVolume,
  FullScreenIconSvg,
  FullScreenExitIconSvg,
};
