import pkg from "pg";
import { config } from "dotenv";

// อ่านข้อมูลจากไฟล์ env
config({ path: "./.env" });
export const { HOST, DATABASE, DATABASE_PORT, USERNAME_, PASSWORD, SERVER_PORT, SERVER_PORT2 } = process.env;

// สร้าง class สืบทอด class จาก Pool เพื่อส่งการตั้งค่าไปให้ superclass
export default class ConnectDB extends pkg.Pool {
  constructor(config) {
    super(config); // ส่ง arg ไปให้ superclass
  }
}

// ตั้งค่าการเชื่อมต่อกับฐานข้อมูล
export const configDB = {
  host: HOST,
  database: DATABASE,
  port: parseInt(DATABASE_PORT),
  user: USERNAME_,
  password: PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};
