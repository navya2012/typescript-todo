"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = __importDefault(require("./db/connection"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT || 3000;
(0, connection_1.default)();
app.use('/api', studentRoutes_1.default);
app.get("/", (req, res) => {
    res.send('hello world');
});
app.listen(port, () => {
    console.log(`server is running at port number ${port}`);
});
//# sourceMappingURL=index.js.map