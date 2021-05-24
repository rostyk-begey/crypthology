import { alphabets } from './alphabets';

export const viegenereCipherEncode = (
  message: string,
  key: string,
  alphabetKey: keyof typeof alphabets = 'uk',
): string => {
  const { [alphabetKey]: alphabet } = alphabets;
  const { length } = alphabet;
  let charInd = 0;

  return message
    .split('')
    .map((c, i) => {
      const index = alphabet.indexOf(c.toLowerCase());

      if (index === -1) return c;

      const keyCharIndex = alphabet.indexOf(
        key[charInd % key.length].toLowerCase(),
      );
      charInd++;

      const isUppercase = c === c.toUpperCase();
      const newIndex = (index + keyCharIndex) % length;
      const res = alphabet[newIndex];
      return isUppercase ? res.toUpperCase() : res;
    })
    .join('');
};

export const viegenereCipherDecode = (
  message: string,
  key: string,
  alphabetKey: keyof typeof alphabets = 'uk',
): string => {
  const { [alphabetKey]: alphabet } = alphabets;
  const { length } = alphabet;
  let charInd = 0;

  return message
    .split('')
    .map((c, i) => {
      const index = alphabet.indexOf(c.toLowerCase());

      if (index === -1) return c;

      const keyCharIndex = alphabet.indexOf(
        key[charInd % key.length].toLowerCase(),
      );
      charInd++;

      const isUppercase = c === c.toUpperCase();
      const newIndex = (index + length - (keyCharIndex % length)) % length;
      const res = alphabet[newIndex];
      return isUppercase ? res.toUpperCase() : res;
    })
    .join('');
};

export default viegenereCipherEncode;
