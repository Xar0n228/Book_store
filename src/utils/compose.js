// Утилита для функциональной композиции из элементов высшего порядка
const compose = (...funcs) => comp => {
  return funcs.reduceRight((wrapped, f) => f(wrapped), comp);
};

export default compose;
