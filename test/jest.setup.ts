expect.extend({
  toBeDivisibleBy(received, argument) {
    const pass = received % argument == 0;
    if (pass) {
      return {
        message: () => `expected ${received} not to be divisible by ${argument}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be divisible by ${argument}`,
        pass: false,
      };
    }
  },
});

// Mocking a global function or setting up a global mock
global.someGlobalFunction = jest.fn();