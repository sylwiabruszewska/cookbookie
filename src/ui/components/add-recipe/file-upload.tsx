import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface FileUploadProps {
  initialImages?: string[];
}

export const FileUpload: FC<FileUploadProps> = ({ initialImages = [] }) => {
  const [files, setFiles] = useState<
    { id: string; file: File | null; preview: string }[]
  >(
    initialImages.map((image) => ({ id: uuidv4(), file: null, preview: image }))
  );
  const [showCheckmark, setShowCheckmark] = useState<boolean>(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        id: uuidv4(),
        file,
        preview: URL.createObjectURL(file),
      }));
      setFiles([...files, ...newFiles]);
      setShowCheckmark(false);
    },
    [files]
  );

  const handleImageLoad = () => {
    setShowCheckmark(true);
    setTimeout(() => {
      setShowCheckmark(false);
    }, 2000);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
    },
    maxFiles: 4,
  });

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.file) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  const removeFile = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const newFiles = files.filter((file) => file.id !== id);
    setFiles(newFiles);
    setShowCheckmark(false);
  };

  return (
    <div className="w-[300px] h-[300px] p-2 bg-[--primary-color] flex flex-col justify-center items-center rounded-[30px] overflow-hidden mx-auto mb-12">
      <div
        {...getRootProps()}
        className={`w-full h-full p-2 rounded-[25px] flex justify-center items-center cursor-pointer ${
          isDragActive
            ? "border-2 border-dashed border-white"
            : "border-2 border-dashed border-[--primary-color]"
        }`}
      >
        <input {...getInputProps()} />

        {files.length === 0 && (
          <div className="w-full h-full p-2 flex flex-col justify-center items-center text-center text-white">
            {isDragActive ? (
              <div>Drop the file here...</div>
            ) : (
              <div>
                <Image
                  src="/camera.svg"
                  alt="Camera"
                  className="w-[64px] h-auto object-fit"
                  width={64}
                  height={64}
                />
              </div>
            )}
          </div>
        )}

        {files.length > 0 && (
          <div className="w-full h-full relative flex items-center justify-center flex-wrap gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className={`rounded-[10px] overflow-hidden relative ${
                  files.length > 1
                    ? "inline-flex w-[100px] h-[100px]"
                    : "w-[250px] h-[250px]"
                }`}
              >
                <Image
                  src={file.preview}
                  alt={file.file ? file.file.name : `Initial image ${file.id}`}
                  fill={true}
                  className="object-cover"
                  onLoad={handleImageLoad}
                />
                {showCheckmark && (
                  <div className="bg-white text-[--transparent] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-10 h-10 flex items-center justify-center opacity-0 animate-checkmark-in">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                )}
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={(event) => removeFile(event, file.id)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
