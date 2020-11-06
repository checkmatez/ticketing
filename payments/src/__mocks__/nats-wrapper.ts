const client = {
  publish: jest.fn().mockImplementation((a, b, c) => c()),
};

export const natsWrapper = {
  getClient: () => client,
};
