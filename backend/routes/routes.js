import getStaticPath from "../dir.js";

export default class Router {
  constructor(router) {
    this.router = router();
  }

  getRoutes = () => {
    this.router.get("/", (req, res) => {
      res.type("html");
      res.sendFile(getStaticPath("index.html"));
    });

    this.router.get("*", (req, res) => {
      res.type("html");
      res.status(404);
      res.sendFile(getStaticPath("404.html"));
    });

    this.router.get("/test", (req, res) => {
      res.send("test");
    });

    // ตัวอย่าง
    this.router.get("/table", (req, res) => {
      res.send("...");
    });

    this.router.get("/api", (req, res) => {
      res.send(JSON.stringify(req.query));
    });

    this.router.post("/postData", (req, res) => {
      console.log(req.body);
      res.end();
    });

    this.router.put("/updateData", (req, res) => {
      res.send(req.query);
    });

    this.router.delete("/deleteData/:data", (req, res) => {
      res.send(req.params);
    });

    this.router.get("*", (req, res) => {
      res.type("html");
      res.status(404);
      res.sendFile(getStaticPath("404.html"));
    });

    return this.router;
  };
}
