import express from "express";
import router from "./routes/routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({message: "Reservation System 1"})
})

app.use("/reservations", router);

export default app;