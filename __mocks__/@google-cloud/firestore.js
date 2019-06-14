/**
 * https://jestjs.io/docs/en/manual-mocks
 */

let Firestore = jest.genMockFromModule('@google-cloud/firestore');

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

const reference = {
  collection: function () {
    return {
      add: function () {
        return new Promise((resolve, reject) => {
          resolve(__getNextMockResult());
        });
      },
      doc: function () {
        return {
          update: function () {
            return new Promise((resolve, reject) => {
              resolve();
            });
          }
        };
      }
    };
  },
  get: function () {
    return new Promise((resolve, reject) => {
      resolve(__getNextMockResult());
    });
  },
  set: function () {
    return new Promise((resolve, reject) => {
      resolve();
    });
  },
  update: function () {
    return new Promise((resolve, reject) => {
      resolve();
    });
  },
};

class mockFirestore extends Firestore {
  constructor(opt) {
    super(opt);
  }

  collection() {
    return {
      doc: function () {
        return reference;
      },
      add: function () {
        return new Promise((resolve, reject) => {
          resolve(__getNextMockResult());
        });
      },
    };
  }
}

mockFirestore.__setMockResultArray = __setMockResultArray;
mockFirestore.Timestamp = {
  now: function () {
    return { 
      _seconds: 1559856428, 
      _nanoseconds: 858000000 
    };
  }
};

module.exports = mockFirestore;