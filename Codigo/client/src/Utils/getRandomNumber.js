export const getRandomNumber = (min, max) => {
  return parseInt(Math.random() * (max + 1 - min) + min);
};
