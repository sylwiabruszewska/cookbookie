import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export const FileUpload = () => {
  const [file, setFile] = useState<{ file: File; preview: string } | null>(
    null
  );
  const [showCheckmark, setShowCheckmark] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const newFile = acceptedFiles[0];
      setFile({
        file: newFile,
        preview: URL.createObjectURL(newFile),
      });
      setShowCheckmark(false);
    }
  }, []);

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
    maxFiles: 1,
  });

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  const removeFile = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (file) {
      URL.revokeObjectURL(file.preview);
    }
    setFile(null);
    setShowCheckmark(false);
  };

  return (
    <div className="w-[300px] h-[300px] p-2 bg-[--primary-color] flex justify-center items-center rounded-[30px] overflow-hidden mx-auto mb-12">
      <div
        {...getRootProps()}
        className={`w-full h-full p-2 rounded-[25px] flex justify-center items-center cursor-pointer ${
          isDragActive
            ? "border-2 border-dashed border-white"
            : "border-2 border-dashed border-[--primary-color]"
        }`}
      >
        <input {...getInputProps()} />

        {!file && (
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

        {file && (
          <div className="w-full h-full relative flex items-center justify-center">
            <div className="inline-flex w-[250px] h-[250px] rounded-[10px] overflow-hidden relative">
              <Image
                src={file.preview}
                alt={file.file.name}
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
                onClick={removeFile}
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
