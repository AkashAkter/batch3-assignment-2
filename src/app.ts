import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/product/product.route";
const app: Application = express();

app.use(express.json());

app.use(cors());

app.use("/api/products", ProductRoutes);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get("./", getAController);

export default app;
