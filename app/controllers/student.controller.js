const db = require("../models");
const Student = db.students;
const Op = db.Sequelize.Op;
// Create and Save a new Student
exports.create = (req, res) => {
    // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Student
  const student = new Student({
    id: req.body.id,
    email: req.body.email,
    pssword: req.body.password,
    token: null
  });
  // Save Student in the database
  Student.create(student, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student."
      });
    else res.send(data);
  });
};