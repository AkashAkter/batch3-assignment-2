import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/product/product.route";
import { OrderRoutes } from "./app/modules/order/order.route";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api", ProductRoutes);
app.use("/api", OrderRoutes);

const getAController = (req: Request, res: Response) => {
  res.send("SERVER IS RUNNING!");
};

app.get("/", getAController);

// Handle 404 errors
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Handle 500 errors
app.use((err: any, req: Request, res: Response) => {
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

export default app;
