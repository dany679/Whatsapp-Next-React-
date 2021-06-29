/* eslint-disable @next/next/no-img-element */

import { WhatsIMg, Center } from './Style.js';
import { Circle } from 'better-react-spinkit';

function Loading() {
  return (
    <center
      style={{
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
      }}
    >
      <div>
        {' '}
        <img
          src='https://logospng.org/download/whatsapp/logo-whatsapp-1024.png'
          alt='whats app'
          style={{
            marginBottom: '30px',
            width: '25vh',
            display: 'flex',
            alignItems: 'center',
          }}
        />
        <Circle color='#3cbc28' style={{ size: '5vh' }} />
      </div>
    </center>
  );
}

export default Loading;
