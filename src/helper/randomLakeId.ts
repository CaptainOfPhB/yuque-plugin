/**
 * Get an random lake id
 * @param {number} length - length of id
 * @returns {string}
 */
function randomLakeId(length: number) {
  const chars = 'abcdef1234567890';
  let identifier = '';
  while (identifier.length < length) {
    identifier += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return identifier;
}

export default randomLakeId;
