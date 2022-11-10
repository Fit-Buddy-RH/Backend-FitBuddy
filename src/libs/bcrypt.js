import bcrypt from "bcrypt";

const saltRounds = 10;

function hash(plainText) {
  return bcrypt.hash(plainText, saltRounds);
}

export default {
  ...bcrypt,
  hash,
};
