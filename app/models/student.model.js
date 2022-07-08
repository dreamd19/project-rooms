const sql = require("./db");
// constructor
const Student = function(students) {
  this.id = students.id;
  this.email = students.email;
  this.pssword = students.password;
  this.token = students.token;
};

Student.create = (newStudent, result) => {
  sql.query("INSERT INTO students SET ?", newStudent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Student: ", { id: res.insertId, ...newStudent });
    result(null, { id: res.insertId, ...newStudent });
  });
};

module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    token: {
      type: Sequelize.STRING
    }
  });
  return Student;
};