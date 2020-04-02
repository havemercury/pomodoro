import React from 'react';

function CurrentSession(props) {
  return (
    <div id='time-left' className='timer'>
      {props.time}
    </div>
  );
}

export default CurrentSession;
