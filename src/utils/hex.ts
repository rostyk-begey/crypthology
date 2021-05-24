export const hexEncode = (str: string) => {
  return str.split('').reduce((res, char) => {
    const hex = char.charCodeAt(0).toString(16).padStart(3, '0');
    return res + hex;
  }, '');
};

export const hexDecode = (hex: string) => {
  const hexes = hex.match(/.{1,4}/g) || [];

  return hexes.reduce(
    (res, val) => res + String.fromCharCode(parseInt(val, 16)),
    '',
  );
};

export const hexToBin = (hex: string) => {
  const hexes = hex.match(/.{1,4}/g) || [];

  return hexes.reduce((res, val) => {
    const bin = parseInt(val, 16).toString(2).padStart(8, '0') + ',';
    return res + bin;
  }, '');
};
