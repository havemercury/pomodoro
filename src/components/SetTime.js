import React from 'react';

function SetTime(props) {
  return (
    <div className='left-col'>
      <h2 id='break-label'>Break Length</h2>
      <div id='break-length' className='timeset'>
        {props.breakLength}
      </div>
      <button id='break-increment' onClick={props.breakUp}>
        <i className='fas fa-arrow-up'></i>
      </button>
      <button id='break-decrement' onClick={props.breakDown}>
        <i className='fas fa-arrow-down'></i>
      </button>
      <hr />

      <h2 id='session-label'>Session Length</h2>
      <div id='session-length' className='timeset'>
        {props.sessionLength}
      </div>
      <button id='session-increment' onClick={props.sessionUp}>
        <i className='fas fa-arrow-up'></i>
      </button>
      <button id='session-decrement' onClick={props.sessionDown}>
        <i className='fas fa-arrow-down'></i>
      </button>
    </div>
  );
}

export default SetTime;
