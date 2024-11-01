const Faculty = require('../models/Faculty');

const registerFaculty = async (req, res) => {
  const { name, email, designation, department } = req.body;

  if (!name || !email || !designation || !department) {
    return res.status(400).json({ message: 'All fields (Name, Email, Designation, Department) are required.' });
  }

  try {
    const existingFaculty = await Faculty.findOne({ email });
    if (!existingFaculty) {
      const create = await Faculty.create({ name, email, designation, department });
      if (create) {
        return res.status(201).json({ message: 'Faculty created successfully.', data: create });
      }
    }

    return res.status(400).json({ message: 'Faculty with this Email already exists.' });

  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

const getFaculties = async (req, res) => {
  try {
    const data = await Faculty.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

module.exports = { registerFaculty, getFaculties };