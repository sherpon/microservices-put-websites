/**
 * https://jestjs.io/docs/en/manual-mocks
 */

let axios = jest.genMockFromModule('axios');

let __mockResponse = {};
const __setMockResponse = (newMockResponse) => {
  __mockResponse = newMockResponse;
};

let __resultIndex = 0;
let __mockResultArray = [{}];

const __setMockResultArray = (newMockResultArray) => {
  __resultIndex = 0;
  __mockResultArray = newMockResultArray;
};

const __getNextMockResult = () => {
  __resultIndex++;
  return __mockResultArray[__resultIndex-1];
};

axios = (options) => {
  return new Promise((resolve, reject) => {
    resolve(__getNextMockResult());
  });
};

axios.__setMockResultArray = __setMockResultArray;
axios.__setMockResponse = __setMockResponse;
module.exports = axios;