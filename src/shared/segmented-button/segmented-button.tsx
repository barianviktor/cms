import React from "react";
import "./segmented-button.scss";
import { SegmentedButtonItem } from "../../interfaces/SegmentedButtonItem";

export interface SegmentedButtonProps {
  selectedItem: string;
  items: SegmentedButtonItem[];
  onChange: (item: string) => void;
}
export default function SegmentedButton({
  selectedItem,
  items,
  onChange,
}: SegmentedButtonProps) {
  return (
    <div className="segmented-button-container">
      {items.map((item) => {
        return (
          <div
            key={item.id}
            className={`segmented-button ${
              item.id === selectedItem && "selected-segmented-button"
            }`}
            onClick={() => onChange(item.id)}
            role="button"
          >
            {item.children}
          </div>
        );
      })}
    </div>
  );
}
