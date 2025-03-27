import express from "express";
import db_connection from "./Database/connection.js";
import user_router from "./src/modules/user/user.route.js";
import { global_response } from "./src/middlewares/error.handle.middleware.js";
import task_router from "./src/modules/task/task.route.js";
import { config } from "dotenv";

config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/user", user_router);
app.use("/task", task_router);
app.use(global_response);

db_connection();
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
