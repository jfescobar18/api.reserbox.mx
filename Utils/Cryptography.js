const bcrypt = require('bcrypt');

exports.cryptPassword = async function (password) {
    try {
        const hashWord = await bcrypt.hash(password, 10);
        return hashWord;
    }
    catch (error) {
        throw error;
    }
};

exports.comparePassword = async function (password, hashWord) {
    try {
        const match = await bcrypt.compare(password, hashWord);
        return match;
    }
    catch (error) {
        throw error;
    }
};