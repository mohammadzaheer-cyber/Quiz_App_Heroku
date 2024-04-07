"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exam_1 = require("../controllers/exam");
const isAuth_1 = require("../middlewares/isAuth");
const router = express_1.default.Router();
router.get('/:quizId', isAuth_1.isAuthenticated, exam_1.startExam);
router.post('/', isAuth_1.isAuthenticated, exam_1.submitExam);
exports.default = router;
