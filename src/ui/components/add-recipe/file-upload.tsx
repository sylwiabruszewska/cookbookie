import Image from "next/image";
import { FileRejection, useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEdgeStore } from "@lib/edgestore";

interface FileUploadProps {
  initialImages?: string[];
  onFilesUploaded?: (urls: string[]) => void;
}

export const FileUpload: FC<FileUploadProps> = ({
  initialImages = [],
  onFilesUploaded,
}) => {
  const [files, setFiles] = useState<
    {
      id: string;
      file: File | null;
      preview: string;
      loaded: boolean;
      url?: string;
    }[]
  >(
    initialImages.map((image) => ({
      id: uuidv4(),
      file: null,
      preview: image,
      loaded: false,
    }))
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { edgestore } = useEdgeStore();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setErrorMessage("");

      const newFiles = acceptedFiles.map((file) => ({
        id: uuidv4(),
        file,
        preview: URL.createObjectURL(file),
        loaded: false,
      }));

      const uploadFilesToServer = async (files: File[]) => {
        const uploadedFiles = await Promise.all(
          files.map(async (file) => {
            const response = await edgestore.publicFiles.upload({ file });
            return response.url;
          })
        );
        return uploadedFiles;
      };

      try {
        const urls = await uploadFilesToServer(acceptedFiles);
        const updatedFiles = newFiles.map((file, index) => ({
          ...file,
          url: urls[index],
        }));

        setFiles((prevFiles) => [...prevFiles, ...updatedFiles]);

        if (onFilesUploaded) {
          onFilesUploaded(urls);
        }
      } catch (error) {
        setErrorMessage("Failed to upload files. Please try again.");
      }
    },
    [edgestore.publicFiles, onFilesUploaded]
  );

  const handleImageLoad = (id: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === id ? { ...file, loaded: true } : file
      )
    );
  };

  const handleDropRejected = (fileRejections: FileRejection[]) => {
    const rejectedFile = fileRejections[0].file;
    if (rejectedFile.size > 4 * 1024 * 1024) {
      setErrorMessage(
        "The file size is too large. Maximum size allowed is 4MB."
      );
    } else if (fileRejections.length > 4) {
      setErrorMessage("You can upload max 4 files.");
    } else {
      setErrorMessage("File upload failed. Please try again.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: handleDropRejected,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
    },
    maxFiles: 4,
    maxSize: 4 * 1024 * 1024, // 4 MB
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
  };

  const getGridClass = () => {
    switch (files.length) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-2 grid-rows-2";
      case 4:
        return "grid-cols-2 grid-rows-2";
      default:
        return "";
    }
  };

  return (
    <div className="relative mx-auto mb-12">
      <div className="w-[300px] h-[300px] p-2 bg-[--primary-color] flex flex-col justify-center items-center rounded-[30px] overflow-hidden">
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
                    src="/icons/camera.svg"
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
            <div
              className={`grid gap-4 p-4 w-full h-full ${getGridClass()}`}
              style={{ gridTemplateRows: files.length === 3 ? "1fr 1fr" : "" }}
            >
              {files.map((file) => (
                <div
                  key={file.id}
                  className={`relative ${
                    files.length === 1 ? "w-full h-full" : "w-[100px] h-[100px]"
                  } rounded-[10px] overflow-hidden`}
                >
                  <Image
                    src={file.preview}
                    alt="Uploaded image"
                    fill={true}
                    className="object-cover"
                    sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    onLoad={() => handleImageLoad(file.id)}
                  />
                  {file.loaded && !initialImages.includes(file.preview) && (
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
      {errorMessage && (
        <div className="absolute bottom-[-20] l-0 text-red-500 mt-2 w-[300px] text-center">
          {errorMessage}
        </div>
      )}
    </div>
  );
};
