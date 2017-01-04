import React, { Component } from 'react';

class SelectDifficulty extends Component {

  render() {
    return(
      <div>
        <h1 id='title'>Generic Dungeon Crawl</h1>
        <div id='difficulty'>
          Select Difficulty: <span className='setDifficulty' onClick={() => this.props.setDifficulty('easy')}>
          Easy</span>, <span className='setDifficulty' onClick={() => this.props.setDifficulty('normal')}>
          Normal</span> or <span className='setDifficulty' onClick={() => this.props.setDifficulty('hard')}>
          Hard</span>
        </div>
      </div>
    )
  }
}

export default SelectDifficulty;
