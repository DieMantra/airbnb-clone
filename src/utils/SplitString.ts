export const stringSplitter = (words: string, separator: string): string => {
  let str = '';
  for (let i = 0; i < words.length; i++) {
    if (words[i] === separator) {
      str += words[i] + (words[i] === ' ' ? '' : ' ');
    } else {
      str += words[i];
    }
  }
  return str;
};
