"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = require("../controllers/studentController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/addStudents', studentController_1.createStudents);
router.get('/all-students', studentController_1.getStudents);
router.get('/students', authMiddleware_1.authUser, studentController_1.studentsById);
router.patch('/updateStudents', authMiddleware_1.authUser, studentController_1.updateStudents);
router.delete('/deleteStudents', authMiddleware_1.authUser, studentController_1.deleteStudents);
exports.default = router;
//# sourceMappingURL=studentRoutes.js.map