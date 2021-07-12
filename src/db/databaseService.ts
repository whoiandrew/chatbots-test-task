import { Sequelize, DataTypes } from "sequelize";
import { ImageAttributes, ImageProps, Image } from "../types";
import { ImageModel } from "./models";

export class DatabaseService {
  createConnection = async (): Promise<Sequelize> => {
    const sequelize = new Sequelize(
      `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@localhost:5432/chatbots-test`
    );
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
    this.initTables(sequelize);
    return sequelize;
  };

  createImage = async (
    image: ImageAttributes,
    props: ImageProps
  ): Promise<number> => {
    const { id } = await ImageModel.create({ ...image, ...props });
    return id;
  };

  getImageByParams = async (queryParams: ImageProps): Promise<Image[]> => {
    console.log(queryParams);
    const images: Image[] = await ImageModel.findAll({
      where: queryParams,
    });
    return images;
  };

  initTables = async (sequelize: Sequelize): Promise<void> => {
    ImageModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        url: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        srcSize: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        file: {
          type: DataTypes.BLOB,
          allowNull: false,
        },
        height: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        width: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        tableName: "image",
        sequelize,
      }
    );
    await ImageModel.sync();
  };

  shutDown = async (connection: Sequelize): Promise<void> => {
    connection.close();
    console.log("Database has gracefuly disconnected");
  };
}
