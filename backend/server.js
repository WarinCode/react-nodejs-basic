import express from "express";
import Router from "./routes/routes.js";
import getStaticPath from "./dir.js";
import Controller from "./controller/controller.js";
import ConnectDB , { configDB, SERVER_PORT, SERVER_PORT2 } from "./connect.js";
import cors from "cors"

// สร้างการเชื่อมต่อ
const connect = await new ConnectDB(configDB).connect();
const client = connect;
// ส่งข้อมูล client(ตัวแปรที่จัดการข้อมูลกับ server) ไปให้ object controller ทำงาน
const controller = new Controller(client);
const { apiRoutes } = controller;

// สร้าง express
const app = express();
const port = parseInt(SERVER_PORT) || parseInt(SERVER_PORT2);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(getStaticPath()));

// จัดการ CURD ของฐานข้อมูล
app.get(apiRoutes.GET, (req, res) => controller.getData(req, res));
app.post(apiRoutes.POST, (req, res) => controller.addData(req, res));
app.put(apiRoutes.UPDATE, (req, res) => controller.updateData(req, res));
app.delete(apiRoutes.DELETE, (req, res) => controller.deleteData(req, res));

// set path เส้นทางต่างๆในหน้าเว็บ
const router = new Router(express.Router);
app.use(router.getRoutes());

// เปิด server ตามหมายเลข port
app.listen(port, () => console.log(`server started on port : ${port}`));