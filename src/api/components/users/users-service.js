const usersRepository = require('./users-repository');
const { hashPassword, passwordMatched } = require('../../../utils/password');

/**
 * Get list of users
 * @param {number} pageNumber - Nomor halaman yang ditampilkan pada response
 * @param {number} pageSize - Jumlah data yang dimunculkan per halaman
 * @param {string} sortField - Nama field pada database user yang diurutkan
 * @param {string} sortOrder - Urutan pengurutan data (asc atau desc)
 * @param {string} searchField - Nama field pada database user yang dicari
 * @param {string} searchKey - Kata kunci pencarian
 * @returns {Object}
 */

async function getUsers(
  pageNumber,
  pageSize,
  sortField,
  sortOrder,
  searchField,
  searchKey
) {
  try {
    const offset = (pageNumber - 1) * pageSize;

    // Panggil fungsi getUsers dari repository
    const users = await usersRepository.getUsers(
      pageSize,
      offset,
      sortField,
      sortOrder,
      searchField,
      searchKey
    );

    // Hitung total count dari pengguna berdasarkan filter
    const totalUsersCount = await usersRepository.getUsersCount(
      searchField,
      searchKey
    );

    // Mengembalikan data pengguna dengan informasi paginasi
    return {
      page_number: pageNumber,
      page_size: pageSize,
      count: users.length,
      total_pages: Math.ceil(totalUsersCount / pageSize),
      has_previous_page: pageNumber > 1,
      has_next_page: pageNumber < Math.ceil(totalUsersCount / pageSize),
      data: users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
      })),
    };
  } catch (error) {
    throw new Error(`Error while fetching users: ${error.message}`);
  }
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Check whether the email is registered
 * @param {string} email - Email
 * @returns {boolean}
 */
async function emailIsRegistered(email) {
  const user = await usersRepository.getUserByEmail(email);

  if (user) {
    return true;
  }

  return false;
}

/**
 * Check whether the password is correct
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {boolean}
 */
async function checkPassword(userId, password) {
  const user = await usersRepository.getUser(userId);
  return passwordMatched(password, user.password);
}

/**
 * Change user password
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {boolean}
 */
async function changePassword(userId, password) {
  const user = await usersRepository.getUser(userId);

  // Check if user not found
  if (!user) {
    return null;
  }

  const hashedPassword = await hashPassword(password);

  const changeSuccess = await usersRepository.changePassword(
    userId,
    hashedPassword
  );

  if (!changeSuccess) {
    return null;
  }

  return true;
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  emailIsRegistered,
  checkPassword,
  changePassword,
};
