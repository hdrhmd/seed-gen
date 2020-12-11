import { Component } from '@angular/core';
const bip39 = require('bip39');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'seed-gen';
  diceRolls = [];
  words = [];
  dictionary = [];
  validChecksums = [];

  constructor() {
    this.dictionary = bip39.wordlists.english;
  }

  displayRolls(rolls) {
    return rolls.map(n => n + 1).join(', ');
  }

  addEntropy(num) {
    this.diceRolls.push(num);
    if (this.diceRolls.length === 4) {
      const rolls = this.diceRolls;
      const index = (rolls[0] % 4) * 512 + rolls[1] * 64 + rolls[2] * 8 + rolls[3];
      this.words.push({
        rolls,
        index,
        label: this.dictionary[index]
      });
      this.diceRolls = [];
    }

    if (this.words.length === 23) {
      const entropyString = this.words.map(w => w.label).join(' ').concat(' ');
      this.validChecksums = this.dictionary.filter(w => bip39.validateMnemonic(entropyString + w));
    }
  }
}
