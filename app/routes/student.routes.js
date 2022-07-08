module.exports = app => {
    const students = require("../controllers/student.controller");
    var router = require("express").Router();
    // Create a new Student
    router.post("/", students.create);
    app.use('/api/students', router);
  };