import React from "react";
import { FC } from "react";

interface ImageProps {
  imgSrc?: string;
  className?: string;
}

const Image: FC<ImageProps> = ({ imgSrc, className }) => {
  return <img className={className} src={imgSrc} alt={imgSrc} />;
};

export default Image;
