import React from "react";
import "./loading.scss";
import { BarLoader, ClipLoader, PuffLoader } from "react-spinners";
import { ColorTypes } from "../../interfaces/ColorTypes";
import { LoadingTypes } from "../../interfaces/LoadingTypes";

export interface LoadingProps {
  type?: LoadingTypes;
  size?: number;
  color?: string;
}

export default function Loading({
  type = LoadingTypes.PUFF,
  size = 50,
  color = "black",
}: LoadingProps) {
  return (
    <div className="loading-wrapper">
      {type === LoadingTypes.CLIP && (
        <ClipLoader
          size={size}
          color={color}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {type === LoadingTypes.PUFF && (
        <PuffLoader
          size={size}
          color={color}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}

      {type === LoadingTypes.BAR && (
        <BarLoader
          color={color}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </div>
  );
}
