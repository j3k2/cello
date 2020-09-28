const bcrypt = require('bcrypt');

async function createEncryptedPassword(password, saltRounds) {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

exports.seed = async function (knex) {
  const username = 'demo';
  const password = 'demo';
  const encryptedPassword = await createEncryptedPassword(password, 10);
  
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username, password: encryptedPassword }
      ]);
    });
};
