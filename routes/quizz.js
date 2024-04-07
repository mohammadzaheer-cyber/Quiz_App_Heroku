"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quizz_1 = require("../controllers/quizz");
const isAuth_1 = require("../middlewares/isAuth");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.post('/', isAuth_1.isAuthenticated, [
    (0, express_validator_1.body)('name')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 10 })
        .withMessage("Quiz name should be 10 charecters long."),
    (0, express_validator_1.body)('questions_list')
        .custom(questions_list => {
        if (questions_list.length == 0) {
            return Promise.reject("Quiz should contain atleast one question.");
        }
        return true;
    }),
    (0, express_validator_1.body)('answers')
        .custom(answers => {
        if (Object.keys(answers).length == 0) {
            return Promise.reject("Answer list should not be empty");
        }
        return true;
    })
], quizz_1.createQuiz);
router.get('/:quizId', isAuth_1.isAuthenticated, quizz_1.getQuiz);
router.put('/', isAuth_1.isAuthenticated, [
    (0, express_validator_1.body)('name')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 10 })
        .withMessage("Quiz name should be 10 charecters long."),
    (0, express_validator_1.body)('questions_list')
        .custom(questions_list => {
        if (questions_list.length == 0) {
            return Promise.reject("Quiz should contain atleast one question.");
        }
        return true;
    }),
    (0, express_validator_1.body)('answers')
        .custom(answers => {
        if (Object.keys(answers).length == 0) {
            return Promise.reject("Answer list should not be empty");
        }
        return true;
    })
], quizz_1.updateQuiz);
router.delete('/:quizId', isAuth_1.isAuthenticated, quizz_1.deleteQuiz);
router.patch('/publish', isAuth_1.isAuthenticated, quizz_1.publishQuiz);
exports.default = router;
