const Student = require('../models/Student.js');

const registerStudent = async (req, res) => {
  const { id, name, email, branch, year } = req.body;

  if (!id || !name || !email || !branch || !year) {
    return res.status(400).json({ message: 'All fields (ID, Name, Email, Branch, Year) are required.' });
  }

  try {
    const existingStudent = await Student.findOne({  email  });
    if (!existingStudent) {
      const create= await Student.create({ id:id, name:name, email:email, branch:branch, year:year});
      if (create){
        return res.status(201).json({ message: 'Student created successfully.', data: create });
      }
      
     
    }

    return res.status(400).json({ message: 'Student with this Email or ID already exists.' });

  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

const getstudents= async(req,res)=>{
  const data=await Student.find({})
  console.log(data)
  res.json(data)
  
}

module.exports = { registerStudent,getstudents };
