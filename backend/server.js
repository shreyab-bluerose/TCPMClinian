import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import clinicalRoutes from "./routes/clinical.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/clinical", clinicalRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
