import { Model } from "sequelize";
import { ImageAttributes, Image } from "../types";

export class ImageModel extends Model<Image> implements ImageAttributes {
  public id!: number;
  public url!: string;
  public srcSize!: number;
  public file!: Buffer;
  public height!: number;
  public width!: number;
}
