import express from "express";
import router from "./routes/routes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000"
}));

app.get("/", (req, res) => {
    res.json({message: "Reservation System 1"})
})

app.use("/reservations", router);

export default app;