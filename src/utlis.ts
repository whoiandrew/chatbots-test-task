import sharp from "sharp";
import { ImageProps } from "./types";

export const isPhoto = (link: string) => link.match(/\.(jpeg|jpg|png|gif)$/);

export const getResizedBuffer = async (
  data: Buffer,
  resizeProps: ImageProps
): Promise<Buffer> => {
  const { height, width } = resizeProps;
  return sharp(data).resize(height, width).toBuffer();
};
