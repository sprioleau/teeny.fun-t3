const hasNone = <T>(array: T[]) => {
  // If not an array, return true
  if (!Array.isArray(array)) return true;
  return array.length === 0;
};

export default hasNone;
