
const uuid = require('uuid');
const crypto = require('../crypto.js');

const userDatabase = {};
// userId -> password

const registerUser = (userName, password) => {
    let hashedPwd = crypto.hashPasswordSync(password);
     // Save the user in the database
    userDatabase[uuid.v4()] = {
        userName: userName,    
        password: hashedPwd
    }
}

const getUserIdFromUserName = (userName) => {
    for (let user in userDatabase) {
        if (userDatabase[user].userName == userName) {
            return userDatabase[user]
        }
    }
}

const checkUserCredentials = (userName, password, done) => {
    console.log('checking user credentials')
    // Check if the credentials are corrects
    let user = getUserIdFromUserName(userName);
    if (user) {
        console.log(user);
        crypto.comparePassword(password, user.password, done);
    } else {
        done('Missing user');
    }
}

exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
