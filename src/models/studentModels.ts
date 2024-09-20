import mongoose  from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required:true,
    unique:true
  },
  branch:{
    type: String,
    required: true
  }
}, { timestamps: true }); 


const StudentModel = mongoose.model('Student', studentSchema);

export default StudentModel;
