import { alphabets } from './alphabets';

export const gammaCipherEncode = (message: string, gamma: string) => {
  return message
    .split('')
    .map((c, i) => {
      const gammaIndex = i % gamma.length;
      const res = c.charCodeAt(0) ^ gamma.charCodeAt(gammaIndex);
      return res.toString(16).padStart(4, '0');
    })
    .join('');
};

export const gammaCipherDecode = (message: string, gamma: string) => {
  return message
    .split(' ')
    .map((hex, i) => {
      const charCode = parseInt(hex, 16);
      const gammaIndex = i % gamma.length;
      const res = charCode ^ gamma.charCodeAt(gammaIndex);
      return String.fromCharCode(res);
    })
    .join('');
};

export const gammaCipherEncode1 = (
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
