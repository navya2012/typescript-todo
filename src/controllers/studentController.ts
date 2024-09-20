import { Request, Response } from "express";
import StudentModel from "../models/studentModels";
import createToken from "../utilities/token";
import { RequestType } from "../types/customTypes";

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await StudentModel.find();
    res.status(200).json(students);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

//post request
export const createStudents = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const existingStudent = await StudentModel.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const studentsData = new StudentModel(req.body);
    const newStudent = await studentsData.save();

    const token = createToken(newStudent._id.toString());

    res.status(200).json({ newStudent, token });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

//get request -id
export const studentsById = async (req: RequestType, res: Response) => {
  const id =   req.userDetails._id;
  try {
    const studentData = await StudentModel.findById(id);
    if (!studentData) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(studentData);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

//patch request -id
export const updateStudents = async (req: RequestType, res: Response) => {
  const id =   req.userDetails._id;
  try {
    const studentData = await StudentModel.findById(id);
    if (!studentData) {
      return res.status(404).json({ message: "Student not found" });
    }

    await StudentModel.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    res.status(200).json({ message: "Updated Successfully" });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

//delete request -id
export const deleteStudents = async (req: RequestType, res: Response) => {
  const id =   req.userDetails._id;
  try {
    const studentData = await StudentModel.findById(id);
    if (!studentData) {
      return res.status(404).json({ message: "Student not found" });
    }

    await StudentModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};
