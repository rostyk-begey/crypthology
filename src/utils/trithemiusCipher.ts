import { alphabets } from './alphabets';

export const trithemiusCipherEncode = (
  message: string,
  shiftFunction: (charIndex: number) => number,
  alphabetKey: keyof typeof alphabets = 'uk',
): string => {
  const { [alphabetKey]: alphabet } = alphabets;
  const { length } = alphabet;

  return message
    .split('')
    .map((c, i) => {
      const index = alphabet.indexOf(c.toLowerCase());
      const keyCharIndex = shiftFunction(i);

      if (index === -1) return c;

      const isUppercase = c === c.toUpperCase();
      const newIndex = (index + keyCharIndex) % length;
      const res = alphabet[newIndex];
      return isUppercase ? res.toUpperCase() : res;
    })
    .join('');
};

export const trithemiusCipherDecode = (
  message: string,
  shiftFunction: (charIndex: number) => number,
  alphabetKey: keyof typeof alphabets = 'uk',
): string => {
  const { [alphabetKey]: alphabet } = alphabets;
  const { length } = alphabet;

  return message
    .split('')
    .map((c, i) => {
      const index = alphabet.indexOf(c.toLowerCase());
      const keyCharIndex = shiftFunction(i);

      if (index === -1) return c;

      const isUppercase = c === c.toUpperCase();
      const newIndex = (index + length - (keyCharIndex % length)) % length;
      const res = alphabet[newIndex];
      return isUppercase ? res.toUpperCase() : res;
    })
    .join('');
};
