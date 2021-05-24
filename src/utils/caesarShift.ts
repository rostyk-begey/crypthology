import { alphabets } from './alphabets';

export const caesarShift1 = (str: string, amount = 0): string => {
  // Wrap the amount
  if (amount < 0) {
    return caesarShift(str, amount + 26);
  }

  // Make an output variable
  let output = '';

  // Go through each character
  for (let i = 0; i < str.length; i++) {
    // Get the character we'll be appending
    let c = str[i];

    // If it's a letter...
    if (c.match(/[a-z]/i)) {
      // Get its code
      const code = str.charCodeAt(i);

      // Uppercase letters
      if (code >= 65 && code <= 90) {
        c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
      }

      // Lowercase letters
      else if (code >= 97 && code <= 122) {
        c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
      }
    }

    // Append
    output += c;
  }

  // All done!
  return output;
};

export const caesarShift = (
  message: string,
  amount = 0,
  alphabetKey: keyof typeof alphabets = 'uk',
): string => {
  const { [alphabetKey]: alphabet } = alphabets;
  const { length } = alphabet;

  // Wrap the amount
  if (amount < 0) {
    return caesarShift(message, amount + length, alphabetKey);
  }

  // All done!
  return message
    .split('')
    .map((c, i) => {
      const index = alphabet.indexOf(c.toLowerCase());

      if (index === -1) return c;

      const isUppercase = c === c.toUpperCase();
      const newIndex = (index + amount) % length;
      const res = alphabet[newIndex];
      return isUppercase ? res.toUpperCase() : res;
    })
    .join('');
};
