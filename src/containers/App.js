import React, { Component } from 'react';
import SetTime from '../components/SetTime';
import CurrentSession from '../components/CurrentSession';
import './App.css';
import ding from '../assets/ding.mp3';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 300,
      sessionLength: 1500,
      totalSeconds: 1500,
      startStopText: 'Start',
      currentSession: 'session'
    };
    this.startInterval = '';
    this.tick = this.tick.bind(this);
    this.displayCurrentTime = this.displayCurrentTime.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  tick() {
    this.setState(prevState => ({
      totalSeconds: prevState.totalSeconds - 1
    }));

    if (this.state.totalSeconds <= 0) {
      document.getElementById('beep').play();
      clearInterval(this.startInterval);
      setTimeout(() => {
        if (this.state.currentSession === 'session') {
          this.setState(prevState => ({
            currentSession: 'break',
            totalSeconds: prevState.breakLength
          }));
          this.startInterval = setInterval(this.tick, 1000);
        } else {
          this.setState(prevState => ({
            currentSession: 'session',
            totalSeconds: prevState.sessionLength
          }));
        }
      }, 2000);
    }
  }

  displayCurrentTime() {
    let min = Math.floor(this.state.totalSeconds / 60);
    let sec = this.state.totalSeconds - min * 60;

    if (min < 10) {
      min = `0${min}`;
    }

    if (sec < 10) {
      sec = `0${sec}`;
    }

    return `${min}:${sec}`;
  }

  handleStartStop() {
    if (this.state.startStopText === 'Start') {
      this.startInterval = setInterval(this.tick, 1000);
      this.setState({
        startStopText: 'Stop'
      });
    } else {
      clearInterval(this.startInterval);
      this.setState({
        startStopText: 'Start'
      });
    }
  }

  handleReset() {
    clearInterval(this.startInterval);
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
    this.setState({
      breakLength: 300,
      sessionLength: 1500,
      totalSeconds: 1500,
      startStopText: 'Start',
      currentSession: 'session'
    });
  }

  setTime(sessionType, arrow) {
    if (arrow === 'up') {
      if (sessionType === 'break' && this.state.breakLength < 3600) {
        this.setState(prevState => ({
          breakLength: prevState.breakLength + 60
        }));
      }
      if (sessionType === 'session' && this.state.sessionLength < 3600) {
        this.setState(prevState => ({
          sessionLength: prevState.sessionLength + 60,
          totalSeconds: prevState.sessionLength + 60
        }));
      }
    }
    if (arrow === 'down') {
      if (sessionType === 'break' && this.state.breakLength > 60) {
        this.setState(prevState => ({
          breakLength: prevState.breakLength - 60
        }));
      }
      if (sessionType === 'session' && this.state.sessionLength > 60) {
        this.setState(prevState => ({
          sessionLength: prevState.sessionLength - 60,
          totalSeconds: prevState.sessionLength - 60
        }));
      }
    }
  }

  render() {
    return (
      <div className='App center-vh-container'>
        <div className='center-vh-item'>
          <header className='title'>
            <h1>Pomodoro</h1>
          </header>
          <SetTime
            breakLength={this.state.breakLength / 60}
            sessionLength={this.state.sessionLength / 60}
            breakUp={this.setTime.bind(this, 'break', 'up')}
            breakDown={this.setTime.bind(this, 'break', 'down')}
            sessionUp={this.setTime.bind(this, 'session', 'up')}
            sessionDown={this.setTime.bind(this, 'session', 'down')}
          />
          <div className='right-col'>
            <h2 id='timer-label'>{this.state.currentSession}</h2>
            <CurrentSession time={this.displayCurrentTime()} />
            <audio src={ding} id='beep'>
              Audio player not supported.
            </audio>
            <button id='start_stop' onClick={this.handleStartStop}>
              {this.state.startStopText}
            </button>
            <button id='reset' onClick={this.handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
