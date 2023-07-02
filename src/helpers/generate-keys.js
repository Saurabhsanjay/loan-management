const CryptoJS = require("crypto-js");
const crypto = require("crypto");
require("dotenv").config(".././.env");


const encryptionKey=process.env.ENCRYPTION_KEY

const generateUniqueKey = (role) => {
  const randomString = crypto.randomBytes(16).toString("hex");
  const roleWithRandomString = `${randomString},${role},${randomString}`;


//for encryption 
  const encryptValue = (value, encryptionKey) => {
    const encryptedValue = CryptoJS.AES.encrypt(
      value,
      encryptionKey
    ).toString();
    return encryptedValue;
  };


  // Encrypt the key
  const encryptedStr = encryptValue(roleWithRandomString, encryptionKey);
 
  return encryptedStr;
};


module.exports=generateUniqueKey;


//for decryption in frontend
// Decrypt the key (on the frontend)
//   const decryptedKey = decryptValue(encryptedKey, encryptionKey);

//  const decryptValue = (encryptedValue, encryptionKey) => {
// const bytes = CryptoJS.AES.decrypt(encryptedValue, encryptionKey);
//  const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
//   return decryptedValue;
//     };