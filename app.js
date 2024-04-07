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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const quizz_1 = __importDefault(require("./routes/quizz"));
const exam_1 = __importDefault(require("./routes/exam"));
const report_1 = __importDefault(require("./routes/report"));
const app = (0, express_1.default)();
const connectionString = process.env.CONNECTION_STRING || "";
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send("Server Started....");
});
app.use('/user', user_1.default);
app.use('/auth', auth_1.default);
app.use('/quiz', quizz_1.default);
app.use('/exam', exam_1.default);
app.use('/report', report_1.default);
app.use((err, req, res, next) => {
    let message;
    let statusCode;
    let resp;
    if (!!err.statusCode && err.statusCode < 500) {
        message = err.message;
        statusCode = err.statusCode;
    }
    else {
        message = "Something went wrong, please try after some time";
        statusCode = 500;
    }
    resp = { status: "Error", message, data: {} };
    if (!!err.data) {
        resp.data = err.data;
    }
    console.log(err.statusCode, err.message);
    res.status(statusCode).send(resp);
});
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(connectionString).then(() => {
        console.log("Database connected");
        app.listen(process.env.PORT, () => {
            console.log("Server started on 8001");
        });
    });
});
connectDB().catch(err => console.log(err, "Error Occured"));
