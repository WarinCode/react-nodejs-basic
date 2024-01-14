import express from "express";
import getStaticPath from "../dir.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.type("html");
  res.sendFile(getStaticPath("index.html"));
});

router.get("/table", (req, res) => {
  res.send("...");
});

router.get("/api", (req, res) => {
  res.send(JSON.stringify(req.query));
});

router.post("/postData", (req, res) => {
  console.log(req.body);
  res.end();
});

router.put("/updateData", (req, res) => {
  res.send(req.query);
});

router.delete("/deleteData/:data", (req, res) => {
  res.send(req.params);
});

router.get("*", (req, res) => {
  res.type("html");
  res.status(404);
  res.sendFile(getStaticPath("404.html"));
  }
);

export default router;
