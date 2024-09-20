"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudents = exports.updateStudents = exports.studentsById = exports.createStudents = exports.getStudents = void 0;
const studentModels_1 = __importDefault(require("../models/studentModels"));
const token_1 = __importDefault(require("../utilities/token"));
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield studentModels_1.default.find();
        res.status(200).json(students);
    }
    catch (err) {
        const error = err;
        res.status(400).json({ error: error.message });
    }
});
exports.getStudents = getStudents;
//post request
const createStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const existingStudent = yield studentModels_1.default.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const studentsData = new studentModels_1.default(req.body);
        const newStudent = yield studentsData.save();
        const token = (0, token_1.default)(newStudent._id.toString());
        res.status(200).json({ newStudent, token });
    }
    catch (err) {
        const error = err;
        res.status(400).json({ error: error.message });
    }
});
exports.createStudents = createStudents;
//get request -id
const studentsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userDetails._id;
    try {
        const studentData = yield studentModels_1.default.findById(id);
        if (!studentData) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(studentData);
    }
    catch (err) {
        const error = err;
        res.status(400).json({ error: error.message });
    }
});
exports.studentsById = studentsById;
//patch request -id
const updateStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userDetails._id;
    try {
        const studentData = yield studentModels_1.default.findById(id);
        if (!studentData) {
            return res.status(404).json({ message: "Student not found" });
        }
        yield studentModels_1.default.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        res.status(200).json({ message: "Updated Successfully" });
    }
    catch (err) {
        const error = err;
        res.status(400).json({ error: error.message });
    }
});
exports.updateStudents = updateStudents;
//delete request -id
const deleteStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userDetails._id;
    try {
        const studentData = yield studentModels_1.default.findById(id);
        if (!studentData) {
            return res.status(404).json({ message: "Student not found" });
        }
        yield studentModels_1.default.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: "Deleted Successfully" });
    }
    catch (err) {
        const error = err;
        res.status(400).json({ error: error.message });
    }
});
exports.deleteStudents = deleteStudents;
//# sourceMappingURL=studentController.js.map