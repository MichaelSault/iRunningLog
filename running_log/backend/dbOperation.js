const config = require('./dbConfig'),
    sql = require('mssql');

const createUser = async(NewUserInfo) => {
    try {
        let pool = await sql.connect(config);
        console.log(NewUserInfo);
        let newUser = await pool.request().query(`INSERT INTO Runners(First, Last, Email, Display, Password) VALUES ('${NewUserInfo.First}', '${NewUserInfo.Last}', '${NewUserInfo.Email}', '${NewUserInfo.Username}', '${NewUserInfo.Password}')`);
        return newUser;
    }
    catch(error) {
        console.log(error);
    }
}

const loginUser = async(userCredentials) => {
    console.log(userCredentials);

    try {
        let pool = await sql.connect(config);
        console.log(userCredentials);
        let returnedUser = await pool.request().query(`SELECT * FROM Runners WHERE Email = '${userCredentials.Email}' AND Password = '${userCredentials.Password}'`);
        console.log("Returned User Email ", returnedUser.recordset[0].Email);
        console.log("Returned User Password ", returnedUser.recordset[0].Password);

        return returnedUser;
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = {
    createUser,
    loginUser
}