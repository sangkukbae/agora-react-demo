import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from './hooks/useAgora';
import MediaPlayer from './components/MediaPlayer';
import './Call.css';

const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });

function Call() {
  const [appid, setAppid] = useState('60dcb9c3c74b44b6b0b85aad121d4b3b');
  const [token, setToken] = useState('00660dcb9c3c74b44b6b0b85aad121d4b3bIAD3dj5FUEg1iWGYQDbV1XRgEKtdLZxAujTEEmHDn1WITAx+f9gAAAAAEAAAO0SY2cyoYQEAAQDZzKhh');
  const [channel, setChannel] = useState('test');
  const {
    localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers
  } = useAgora(client);

  useEffect(() => {
    document.getElementById('join')?.click();
  }, []);

  return (
    <div className='call'>
      <form className='call-form'>
        <label>
          AppID:
          <input type='text' name='appid' onChange={ (event) => { setAppid(event.target.value); } } />
        </label>
        <label>
          Token(Optional)
          <input type='text' name='token' onChange={ (event) => { setToken(event.target.value); } } />
        </label>
        <label>
          Channel:
          <input type='text' name='channel' onChange={ (event) => { setChannel(event.target.value); } } />
        </label>
        <div className='button-group'>
          <button id='join' type='button' className='btn btn-primary btn-sm' disabled={ joinState } onClick={ () => { join(appid, channel, token); } }>Join</button>
          <button id='leave' type='button' className='btn btn-primary btn-sm' disabled={ !joinState } onClick={ () => { leave(); } }>Leave</button>
        </div>
      </form>
      <div className='player-container'>
        <div className='local-player-wrapper'>
          <p className='local-player-text'>{ localVideoTrack && `localTrack` }{ joinState && localVideoTrack ? `(${client.uid})` : '' }</p>
          <MediaPlayer videoTrack={ localVideoTrack } audioTrack={ localAudioTrack }></MediaPlayer>
        </div>
        { remoteUsers.map(user => (<div className='remote-player-wrapper' key={ user.uid }>
          <p className='remote-player-text'>{ `remoteVideo(${user.uid})` }</p>
          <MediaPlayer videoTrack={ user.videoTrack } audioTrack={ user.audioTrack }></MediaPlayer>
        </div>)) }
      </div>
    </div>
  );
}

export default Call;
