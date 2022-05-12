/**
 * checkAlphaNumericString - function to check the
 *              given string is alpha numeric or not
 *
 * @param {String} string - string to check
 * @returns a boolean true/false
 */
export const checkAlphaNumericString = (string) =>
  /[0-9]/.test(string) && /[a-z]/i.test(string);
