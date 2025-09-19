import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import linkRouter from "./routes/linkRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.json";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

// 主 API 路由
app.use("/api/links", linkRouter);

// Swagger 文件
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 健康檢查
app.get("/api/health", (req, res) => res.send("OK"));

export default app;

