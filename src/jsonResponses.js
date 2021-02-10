// this will return a random number no bigger than `max`, as a string
// we will also doing our query parameter validation here
const randomNumberJSON = (max = 1) => {
  let max2 = Number(max); // cast `max`to a Number
  max2 = !max2 ? 1 : max; // if `max`is not a numbe because it is the "falsy" NaN, default it to 1
  max2 = max2 < 1 ? 1 : max2; // if `max` is less than 1 default it to 1

  const number = Math.random() * max2;
  const responseObj = {
    timestamp: new Date(),
    number,
  };
  return JSON.stringify(responseObj);
};

// similart ot the /random-number endpoint in index.js
const getRandomNumberResponse = (request, response, params) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(randomNumberJSON(params.max));
  response.end();
};

module.exports.getRandomNumberResponse = getRandomNumberResponse;
