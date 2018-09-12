import React, { Component } from 'react';
import './App.css';

const list = [
  "voiture",
  "banane",
  "table",
  "toilette",
  "football"
];

class Touch extends Component {
  state = {
    clicked: false
  }

  handleClick() {
    this.setState({ clicked: true });
    this.props.save(this.props.letter);
  }

  render() {
    const { clicked } = this.state;

    if (clicked) {
      return (
        <div className="Touch Disabled">
          <span className="Touch__Letter">
            {this.props.letter}
          </span>
        </div>
      );
    }

    if (!clicked) {
      return (
        <div className="Touch" onClick={() => this.handleClick()}>
          <span className="Touch__Letter">
            {this.props.letter}
          </span>
        </div>
      );
    }
  }
}

class Keyboard extends Component {
  state = {
    alphabet: "azertyuiopqsdfghjklmwxcvbn",
  }

  render() {
    let { alphabet } = this.state;
    alphabet = alphabet.split("");

    return (
      <div className="Keyboard">
        {alphabet.map((letter, index) =>
          <Touch
            key={index}
            letter={letter}
            save={() => this.props.save(letter)}
          />
        )}
      </div>
    );
  }
}

class Word extends Component {
  state = {
    secretWord: ""
  }

  componentWillMount() {
    this.computeDisplay(this.props.secretWord, this.props.usedLetters);
  }

  componentWillReceiveProps(nextProps) {
    this.computeDisplay(nextProps.secretWord, nextProps.usedLetters);
  }

  computeDisplay(secretWord, usedLetters) {
    console.log(secretWord, usedLetters);

    secretWord = secretWord.split("");
    console.log(secretWord);

    // build regex with letters array
    const exp = usedLetters.length > 0 ? usedLetters.join("|") : " ";
    let regex = new RegExp(exp);
    console.log(regex);

    // transform unknow letters in "_"
    for (let i = 0 ; i < secretWord.length ; i++) {
      const matched = secretWord[i].match(regex);

      if (!matched) {
        secretWord[i] = "_";
      }
    }

    secretWord = secretWord.join("");
    console.log(secretWord);

    this.setState({ secretWord });
  }

  render() {
    let { secretWord } = this.state;
    secretWord = secretWord.split("");

    return (
      <div className="Word">
        {secretWord.map((letter, index) =>
          <span key={index} className="Word_Display">{letter}</span>
        )}
      </div>
    );
  }
}

class App extends Component {
  state = {
    secretWord: "",
    usedLetters: []
  }

  componentWillMount() {
    this.shuffle();
  }

  shuffle() {
    const i = Math.floor(Math.random() * Math.floor(list.length));
    this.setState({ secretWord: list[i] });
  }

  // fx for biding
  save = letter => {
    this.setState({ usedLetters: this.state.usedLetters.concat(letter) });
  }

  render() {
    return (
      <div className="App">
        <Word
          secretWord={this.state.secretWord}
          usedLetters={this.state.usedLetters}
        />
        <Keyboard save={this.save} />
      </div>
    );
  }
}

export default App;
