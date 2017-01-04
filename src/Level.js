import React, { Component } from 'react';
import gui from './GUI0.png';

class Level extends Component {
  constructor(props) {
    super(props);
    this.displayPoints = this.displayPoints.bind(this);
    this.displayDefault = this.displayDefault.bind(this);
    this.state = {display: null};
  }

  componentDidMount() {
    const canvas = this.refs.expBar;
    this.ctx = canvas.getContext('2d');
    this.drawExpBar();
  }

  componentDidUpdate() {
    this.ctx.clearRect(0, 0, 108, 36);
    this.drawExpBar();
  }

  drawExpBar() {
    const [lastLevel, nextLevel] = this.calculateExp();
    const img = new Image();
    img.src = gui;
    img.onload = () => this.ctx.drawImage(img, 96, 5, 48, 6, 0, 0, 110, 20);
    this.ctx.fillStyle = '#C2BD54';
    this.ctx.fillRect(5, 3, Math.floor(((this.props.stats.exp - lastLevel) / (nextLevel - lastLevel)) * 100), 14);
  }

  calculateExp() {
    let nextLevel = 5;
    let lastLevel = 5;
    for (let i = 0; i < this.props.stats.level - 1; i++) {
      lastLevel *= 2.25;
    }
    lastLevel = this.props.stats.level === 1 ? 0 : lastLevel;
    for (let i = 0; i < this.props.stats.level; i++) {
      nextLevel *= 2.25;
    }
    lastLevel = Math.ceil(lastLevel);
    nextLevel = Math.ceil(nextLevel);
    return [lastLevel, nextLevel];
  }

  displayPoints() {
    const [lastLevel, nextLevel] = this.calculateExp();
    this.setState({display:
      `${this.props.stats.exp - lastLevel}/${nextLevel - lastLevel}`
    });
  }

  displayDefault() {
    this.setState({display: null});
  }

  render() {
    return (
      <div>
        <div id='level'>
          {`Level ${this.props.stats.level}`}
        </div>
        <canvas id='exp-bar' width='110' height='20' ref='expBar'/>
        <div id='exp-points' onMouseOver={this.displayPoints} onMouseOut={this.displayDefault}>
          {this.state.display}
        </div>
      </div>
    )
  }
}

export default Level;
