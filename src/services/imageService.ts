import { isPhoto, getResizedBuffer } from "../utlis";
import fetch from "node-fetch";
import { ImageAttributes, ImageProps, Image } from "../types";

export class ImageService {
  generateImage = async (
    url: string,
    resizeProps: ImageProps
  ): Promise<ImageAttributes> => {
    let imageAttrs: ImageAttributes;
    do {
      const res = await fetch(url);
      const body = await res.json();
      imageAttrs = { ...body, srcSize: body.fileSizeBytes };
    } while (!isPhoto(imageAttrs.url));
    const resFile = await fetch(imageAttrs.url);
    const file = await getResizedBuffer(await resFile.buffer(), resizeProps);
    return { ...imageAttrs, file };
  };
}
