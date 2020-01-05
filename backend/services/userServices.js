var databaseServices = require('./databaseService.js')
var exports = module.exports = {}

/**
 * Return true if user/password couple is correct or else false
 * @param pseudo
 * @param password
 * @return boolean
 */
exports.verifyPseudo = async function (pseudo, password) {
  try {
    console.log("'" + pseudo + "' is trying to connect.")
    const user = await databaseServices.findUserByPseudoAndPassword(pseudo, password)
    if (user && user.pseudo === pseudo) {
      console.log("Credentials of '" + pseudo + "' are corrects.")
      return true
    }
    console.log('Credentials of ' + pseudo + ' are incorrect.')
    return false
  } catch (err) {
    console.log("Error during pseudo verification of '" + pseudo + "' : " + err)
    throw err
  }
}

/**
 * Add a user to the database if the pseudo does not already exists
 * @param pseudo
 * @param password
 * @returns {Promise<boolean>}
 */
exports.addUser = async function (pseudo, password) {
  console.log("New user '" + pseudo + "' is trying to register.")
  try {
    if (await isUserExisting(pseudo)) {
      console.log('Pseudo is already used')
      return false
    }
  } catch (e) {
    console.log('Error during verification of doubloons : ' + e)
    throw e
  }
  try {
    const res = await databaseServices.addUser(pseudo, password)
    if (res) {
      console.log("User '" + pseudo + "' has been added successfully.")
      return true
    } else {
      console.log("'" + pseudo + "' has not been added.")
      return false
    }
  } catch (err) {
    console.log("Error adding of '" + pseudo + "' : " + err)
    throw err
  }
}

/**
 * Update the password of an existing user and verifies
 * that the old password corresponds
 * @param pseudo
 * @param oldPassword
 * @param newPassword
 * @returns {Promise<boolean>}
 */
exports.updatePassword = async function (pseudo, oldPassword, newPassword) {
  console.log("Updating password of '" + pseudo + "'")
  try {
    if (await isUserExisting(pseudo) && await databaseServices.findUserByPseudoAndPassword(pseudo, oldPassword)) {
      await databaseServices.updatePassword(pseudo, newPassword)
      return true
    }
    return false
  } catch (e) {
    console.log('Error during verification of existing user : ' + e)
    throw e
  }
}

/**
 * returns True if the user exists (by pseudo)
 * @param pseudo
 * @returns {Promise<boolean>}
 */
async function isUserExisting (pseudo) {
  try {
    return (await databaseServices.findUserByPseudo(pseudo)) !== undefined
  } catch (e) {
    throw new Error("Error during existence checking of : '" + pseudo + "' : " + e)
  }
}
