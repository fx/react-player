import './videoplayer.less';

import React from 'react';
import VideoPlayer from './videoplayer';

// const mount = document.getElementById('player');

if (process.env.NODE_ENV === 'development') {
  const app = document.createElement('div');
  app.setAttribute('id', 'player');
  document.body.appendChild(app);

  React.render(<VideoPlayer />, app);
}


