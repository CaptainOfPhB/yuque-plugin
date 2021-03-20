/**
 * Get an unique identifier
 * @param {number} length - length of identifier
 * @returns {string}
 */
function randomIdentifier(length: number) {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let identifier = '';
  while (identifier.length < length) {
    identifier += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return identifier;
}

export default randomIdentifier;
