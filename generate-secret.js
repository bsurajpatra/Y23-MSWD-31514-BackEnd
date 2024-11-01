const crypto = require('crypto');

// Generate a random 64-character hex string
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Generate and display the key
const secretKey = generateSecretKey();
console.log('Your JWT Secret Key:');
console.log(secretKey);