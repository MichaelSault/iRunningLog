const config = require('./dbConfig'),
    sql = require('mssql');

const createUser = async(NewUserInfo) => {
    try {
        let pool = await sql.connect(config);
        let newUser = await pool.request().query(`INSERT INTO Runners(First, Last, Email, Display, password) VALUES ('${NewUserInfo.First}', '${NewUserInfo.Last}', '${NewUserInfo.Email}', '${NewUserInfo.Display}', '${NewUserInfo.Password}')`);
        return newUser;
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = {
    createUser
}