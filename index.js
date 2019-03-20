const brain = require('brain.js')

// const network = new brain.NeuralNetwork();

// simple prediction
// network.train([
//     { input: [0, 0, 0], output: [0] },
//     { input: [0, 0, 1], output: [0] },
//     { input: [0, 1, 1], output: [0] },
//     { input: [1, 0, 1], output: [1] },
//     { input: [1, 1, 1], output: [1] },
// ])

// const output = network.run([1, 1, 0]) 

// console.log('prob ' + output)

// two teams who win ?
// network.train([
//     { input: [1, 2], output: [1] }, // team 2 wins
//     { input: [1, 3], output: [1] }, // team 3 wins
//     { input: [2, 3], output: [0] },  // team 2 wins
//     { input: [2, 4], output: [1] }, // team 4 wins
//     // add a little data and it changes the output 
//     // { input: [1, 2], output: [0] }, // team 1 wins
//     // { input: [1, 3], output: [0] },  // team 1 wins
//     // { input: [3, 4], output: [0] }, // team 3 wins
// ])

// const output = network.run([1, 4]) // prob 0.9988476634025574 team 4 wins

// console.log(`Prob ${output}`)


const fs = require('fs');
const data = require('./data.json');

const networkPath = 'hardware-software-cached.network.json';

const trainingData = data.map(item => ({
  input: item.text,
  output: item.category
}));

const network = new brain.recurrent.LSTM();
let networkData = null;
if (fs.existsSync(networkPath)) {
  networkData = JSON.parse(fs.readFileSync(networkPath));
  network.fromJSON(networkData);
} else {
  network.train(trainingData, {
    iterations: 2000
  });
  fs.writeFileSync(networkPath, JSON.stringify(network.toJSON(), null, 2));
}

const output = network.run('The code has some bugs');

console.log(`Category: ${output}`);



