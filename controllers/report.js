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
exports.getReport = void 0;
const report_1 = __importDefault(require("../models/report"));
const error_1 = __importDefault(require("../helper/error"));
const getReport = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let report;
        if (!!req.params.reportId) {
            const reportId = req.params.reportId;
            report = yield report_1.default.findById(req.params.reportId);
            if (!report) {
                const err = new error_1.default("Report not found");
                err.statusCode = 404;
                throw err;
            }
            if (report.userId.toString() !== ((_a = req.userId) === null || _a === void 0 ? void 0 : _a.toString())) {
                const err = new error_1.default("You are not allowed");
                err.statusCode = 405;
                throw err;
            }
        }
        else {
            report = yield report_1.default.find({ userId: req.userId });
        }
        if (!report) {
            const err = new error_1.default("Report not found");
            err.statusCode = 404;
            throw err;
        }
        const resp = { status: "Success", message: "Report found", data: report };
        res.status(200).send(resp);
    }
    catch (error) {
        next(error);
    }
});
exports.getReport = getReport;
