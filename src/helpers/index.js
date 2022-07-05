export const addSpacesOnInput = (value) => value.split('').reverse()
  .join('')
  .replace(/(\d{3}([,.]\d{1,2})?)/g, '$1 ')
  .split('')
  .reverse()
  .join('')
  .replace(/^ /, '');

export const removeAllSpaces = (value) => value.replace(/[^\d]/g, '');

export default {
  addSpacesOnInput,
  removeAllSpaces,
};