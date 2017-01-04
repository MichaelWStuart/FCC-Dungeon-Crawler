import React, { Component } from 'react';
import Game from './Game';
import GameOver from './GameOver';
import Victory from './Victory';
import Loading from './Loading';
import SelectDifficulty from './Difficulty';

class App extends Component {
  constructor(props) {
    super(props);
    this.viewSize = 352;
    this.setDifficulty = this.setDifficulty.bind(this);
    this.setGameOver = this.setGameOver.bind(this);
    this.setVictory = this.setVictory.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.updateMidpoint = this.updateMidpoint.bind(this);
    this.state = { view: 'select difficulty'};
  }

  componentWillMount() {
    window.addEventListener("resize", this.updateMidpoint);
    this.updateMidpoint();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateMidpoint);
  }

  updateMidpoint() {
    this.setState({midpoint: Math.floor(window.innerWidth / 2)});
  }

  setDifficulty(difficulty) {
    this.setState({view: 'loading', loading: true, difficulty});
  }

  setGameOver(status) {
    if (status) {
      this.setState({view: 'game over', loading: false});
    } else {
      this.setState({view: 'game', loading: true});
    }
  }

  setVictory(status) {
    if (status) {
      this.setState({view: 'victory', loading: false});
    } else {
      this.setState({view: 'game', loading: true});
    }
  }

  setLoading(loading, callback) {
    this.setState({loading}, callback);
  }

  renderMode() {
    switch (this.state.view) {
      case('select difficulty'):
        return (<SelectDifficulty setDifficulty={this.setDifficulty} />);
      case('game over'):
        return (<GameOver viewSize={this.viewSize} setGameOver={this.setGameOver}/>);
      case('victory'):
        return (<Victory viewSize={this.viewSize} setVictory={this.setVictory}/>);
      default:
        return (<Game
          setLoading={this.setLoading}
          loading={this.state.loading}
          setGameOver={this.setGameOver}
          setVictory={this.setVictory}
          viewSize={this.viewSize}
          difficulty={this.state.difficulty}
          midpoint={this.state.midpoint}/>)
    }
  }

  render() {
    return (
      <div id='container'>
        {this.state.loading && <Loading/>}
        {this.renderMode()}
      </div>
    )
  }
}

export default App;
