const frequencyTable = (str: string) => {
  return str.split('').reduce((acc, c) => {
    if (c !== ' ') {
      acc[c] = acc[c] === undefined ? 1 : acc[c] + 1;
    }

    return acc;
  }, {} as any);
};

export default frequencyTable;
