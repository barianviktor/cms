import React from "react";
import "./file-input.scss";
import { FileTypes } from "../../interfaces/FileTypes";
export interface FileInputProps {
  id: string;
  name: string;
  multiple?: boolean;
  accept: FileTypes[];
  maxSize: number;
  files: File[];
  setFiles: (files: File[]) => void;
}
export default function FileInput({
  id,
  name,
  multiple = true,
  accept,
  maxSize,
  setFiles,
  files,
}: FileInputProps) {
  const [error, setError] = React.useState<string[]>([]);
  const validateFile = (file: File) => {
    if (maxSize && file.size > maxSize) {
      setError([
        ...error,
        `File "${file.name}" is too large. Maximum size is ${
          maxSize / 1024 / 1024
        } MB.`,
      ]);
      return false;
    }

    if (accept && !accept.includes(file.type as FileTypes)) {
      setError([
        ...error,
        `File type "${
          file.type
        }" is not supported. Please select a valid file type: ${accept.join(
          ", "
        )}.`,
      ]);
      return false;
    }

    return true;
  };
  const handleChange = (event: any) => {
    setError([]);
    console.log("event", event);
    const filesArray = [...event.target.files];
    const validFiles = filesArray.filter(validateFile);
    setFiles(validFiles);
    console.log("validFiles", validFiles);
  };
  function deleteFile(index: number): void {
    const updatedItems = files.filter((file, i) => i !== index);
    setFiles(updatedItems);
  }

  return (
    <div>
      <input
        onChange={handleChange}
        id={id}
        name={name}
        accept={accept.join(", ")}
        type="file"
        multiple={multiple}
      />
      {error.map((error: string) => {
        return <p>{error}</p>;
      })}
      <div>
        {files.map((file, index) => (
          <div
            className="file-container"
            onClick={() => deleteFile(index)}
            key={file.name}
          >
            <div>{file.name}</div>
            <img src={URL.createObjectURL(file)} alt={file.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
