class Emitter {
  _events = {};

  constructor() {
    if (!this instanceof Emitter) {
      return new Emitter();
    }
  }

  on(type, listener) {
    if (typeof listener != 'function') {
      throw new TypeError();
    }

    let listeners = this._events[type] || (this._events[type] = []);
    if (listeners.indexOf(listener) == -1) {
      listeners.push(listener);
    }

    return this;
  }

  off(type, ...args) {
    if(args.length == 0) {
      this._events[type] = null;
    }

    let listener = args[0];
    if (typeof listener != 'function') {
      throw new TypeError();
    }

    let listeners = this._events[type];
    if (!listeners || !listeners.length) {
      return this;
    }


    let indexOfListener = listeners.indexOf(listener)
    if(indexOfListener == -1) {
      return this;
    }
    listeners.splice(indexOfListener, 1);

    return this;
  }

  emit(type, ...args) {
    let listeners = this._events[type];
    if (!listeners || !listeners.length) {
      return false;
    }
    listeners.forEach(fn => fn.apply(null, args));

    return true;
  }
}

class Player extends Emitter {
  _listeners = {};

  video = null;
  sound = 0;

  constructor(node) {
    super();
    if (!this instanceof Player) {
      return new Player();
    }

    if (!node) {
      throw new Error('Please specify a valid DOM Node');
    }

    this.video = node;
    this.bind('loadedmetadata', this.loadedmetadata);
    this.bind('timeupdate', this.timeupdate);
    this.bind('progress', this.progress);
    this.bind('seeked', this.seeked);
    this.bind('ended', this.stop);
  }

  bind(type, listener) {
    this._listeners[type] = listener;
    this.video.addEventListener(type, listener, false);
  }

  unbind() {
    for (const e in this._listeners) {
      if(this._listeners.hasOwnProperty(e) && this._listeners) {
        this.removeEventListener(type, listener);
      }
    }
  }

  unbindAll() {
    this.unbind();
    for (const e in this._events) {
      if (this._events.hasOwnProperty(e) && this._events[e]) {
        this.off(e, fn);
      }
    }
  }

  loadedmetadata = () => {
    this.emit('duration', {
      data: this.video.duration,
    });
  }

  timeupdate = () => {
    this.emit('update', {
      data: {
        currentTime: this.video.currentTime,
        progress: this.video.currentTime / this.video.duration * 100,
      },
    });
  }

  progress = () => {
    let { video } = this;
    if (video.buffered.length > 0 && video.buffered.end && video.duration) {
      let length = video.buffered.length;
      let percent = (video.buffered.end(length - 1) / video.duration) * 100;
      this.emit('buffer', {
        data: percent,
      });
    }
  }

  seeked = () => {
    this.emit('seeked', {
      data: this.video.seeking,
    });
  }

  play = () => {
    this.video.play();
    this.playing = true;
    this.emit('play', {
      data: true,
    });
  }

  pause = () => {
    this.video.pause();
    this.playing = false;
    this.emit('pause', {
      data: false,
    });
  }

  stop = () => {
    this.video.pause();
    this.video.currentTime = 0;
    this.playing = false;
    this.emit('stop', {
      data: {
        playing: this.playing,
        currentTime: this.video.currentTime,
      }
    });
  }

  fullscreen = () => {
    const { video } = this;
    if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.mozRequestFullscreen) {
        video.mozRequestFullscreen();
      }

      // Emit fullscreen event here
      this.emit('fullscreen',  {
        data: {
          fullscreen: true,
        }
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozExitFullscreen) {
        document.mozExitFullscreen();
      }

      // Emit exit event here
      this.emit('fullscreen',  {
        data: {
          fullscreen: false,
        }
      });
    }
  }

  seek = (e) => {
    if (!this.video.readyState) {
      return false;
    }

    const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;
    this.pause();
    this.video.currentTime = xPos * this.video.duration;
    this.play();
    this.emit('seeking', {
      data: this.video.seeking,
    });
  }

  volume = (volume) => {
    this.video.volume = volume;
    this.emit('volume', {
      data: this.video.volume,
    });
  }

  mute = (value) => {
    this.video.muted = !this.video.muted;
    if (this.video.muted) {
      this.sound = value;
      this.volume(0);
    } else {
      this.volume(this.sound);
    }
  }
}

export default Player;
