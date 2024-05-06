const { User } = require('../../../models');

async function getUsers(
  pageSize,
  offset,
  sortField,
  sortOrder,
  searchField,
  searchKey
) {
  const query = {};

  // Membuat query untuk pencarian jika diberikan field pencarian dan kata kunci
  if (searchField && searchKey) {
    query[searchField] = new RegExp(searchKey, 'i');
  }

  // Menggunakan method find untuk mendapatkan daftar user dengan filter, sorting, dan pagination
  return User.find(query)
    .sort({ [sortField]: sortOrder === 'desc' ? -1 : 1 })
    .skip(offset)
    .limit(pageSize);
}

async function getUsersCount(searchField, searchKey) {
  const query = {};

  // Membuat query untuk pencarian jika diberikan field pencarian dan kata kunci
  if (searchField && searchKey) {
    query[searchField] = new RegExp(searchKey, 'i');
  }

  // Menggunakan method countDocuments untuk menghitung jumlah user dengan filter yang diberikan
  return User.countDocuments(query);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Get user by email to prevent duplicate email
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}

module.exports = {
  getUsers,
  getUsersCount,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
};
