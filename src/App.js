import React, { Component } from 'react';
import './App.css';

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

class App extends Component {

  randomGenerate = (min, max) => {
    const rand = min - 0.5 + Math.random() * (max - min + 1)
    return Math.round(rand);
  }

  getMedian = (arr, amount) => {
    const sortedArr = arr.sort((a, b) => a - b);    
    return amount % 2 ? sortedArr[amount / 2 - 0.5] : sortedArr[amount / 2 - 1];
  }

  getMode = (arr) => {
    let objOfFrequency = {};

    arr.forEach(function (a) {
      objOfFrequency[a] = objOfFrequency[a] + 1 || 1;
    });

    const arrOfFrequency = Object.values(objOfFrequency);
    const frequencyValue = Math.max.apply(null, arrOfFrequency);

    return getKeyByValue(objOfFrequency, frequencyValue);
  }

  getSTDEV = (arr, average, amount) => {
    const arrPowOfDelta = [];

    for (let i = amount - 1; i >= 0;  i--) {
      arrPowOfDelta[i] = Math.pow(arr[i] - average, 2);
    }

    const sumPowOfDelta = arrPowOfDelta.reduce((p, c) => c + p);

    return Math.sqrt((sumPowOfDelta / (amount - 1)), 2);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const max = e.target.max.value;
    const min = e.target.min.value;
    const amount = e.target.amount.value;
    console.log('min', min, 'max', max, 'amount', amount);

    let basicArr = [];
  
    for (let i = amount - 1; i >= 0;  i--) {
      basicArr[i] = this.randomGenerate(min, max);
    }
    console.log('basicArr', basicArr);

    const average = basicArr.reduce((p, c) => c + p) / amount;
    const median = this.getMedian(basicArr, amount);
    const mode = this.getMode(basicArr);
    const STDEV = this.getSTDEV(basicArr, average, amount);

    console.log('Average', average);
    console.log('Median', median);
    console.log('Mode', mode);
    console.log('STDEV', STDEV);
  }
  render() {
    return (
      <form action="#" onSubmit={this.handleSubmit} className="wrapper">
        <div className="row">
          <label htmlFor="min">Минимальное число</label>
          <input type="number" step="any" name="min" id="min" />
        </div>
        <div className="row">
          <label htmlFor="max">Максимальное число</label>
          <input type="number" step="any" name="max" id="max"/>
        </div>
        <div className="row">
          <label htmlFor="amount">Количество чисел</label>
          <input type="number" step="any" name="amount"  id="amount" />
        </div>
        <button type="submit">Button</button>
      </form>
    );
  }
}

export default App;
