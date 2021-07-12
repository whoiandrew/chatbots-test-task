export interface ImageAttributes {
  id?: number;
  url: string;
  srcSize: number;
  file: Buffer;
}

export interface ImageProps {
  height?: number;
  width?: number;
}

export type Image = ImageAttributes | ImageProps;
