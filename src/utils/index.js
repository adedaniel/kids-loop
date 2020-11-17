export const mockSignInApi = () => {
  // This returns a promise that mocks an api response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};
