const Course = require('../models/Course');

const registerCourse = async (req, res) => {
  const { name, code, ltps, credits } = req.body;

  if (!name || !code || !ltps || !credits) {
    return res.status(400).json({ message: 'All fields (Name, Code, LTPS, Credits) are required.' });
  }

  try {
    const existingCourse = await Course.findOne({ code });
    if (!existingCourse) {
      const create = await Course.create({ name, code, ltps, credits });
      if (create) {
        return res.status(201).json({ message: 'Course created successfully.', data: create });
      }
    }

    return res.status(400).json({ message: 'Course with this Code already exists.' });

  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const data = await Course.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

module.exports = { registerCourse, getCourses };