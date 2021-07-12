import express, { Response, Request } from "express";
import dotenv from "dotenv";
import { Constants } from "./constants";
import { ImageService } from "./services/imageService";
import { DatabaseService } from "./db/databaseService";
import { ImageProps } from "./types";
import { Sequelize } from "sequelize/types";

dotenv.config();

const app = express();

const databaseService = new DatabaseService();
const imageService = new ImageService();

let connection: Sequelize;

app.use(express.json());

app.post("/upload/dog/image", (req: Request, res: Response): void => {
  const { height, width } = req.body;
  const imageProps: ImageProps = { height, width };
  Object.values(imageProps).forEach((param) => {
    if (!Number.isInteger(parseInt(param, 10))) {
      try {
        res.send({ error: "Wrong value" });
      } catch (e) {
        console.error(e);
      }
    }
  });
  imageService
    .generateImage(Constants.DOGS_API_URL, imageProps)
    .then(async (image) => {
      const id = await databaseService.createImage(image, imageProps);
      res.send({ id });
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(Constants.PORT, async () => {
  connection = await databaseService.createConnection();
  console.log(`listening on port ${Constants.PORT}...`);
});
