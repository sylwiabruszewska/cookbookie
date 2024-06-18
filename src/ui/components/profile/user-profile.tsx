"use client";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { Button } from "@/ui/components/button";
import { useEdgeStore } from "@lib/edgestore";
import { updateUserProfileImage } from "@lib/actions";

const UserProfile = () => {
  const { edgestore } = useEdgeStore();
  const { data: session } = useSession();
  const currentUserImage = session?.user?.image;
  const [imageUrl, setImageUrl] = useState(currentUserImage);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const saveChanges = async () => {
    setLoading(true);
    console.log("newImageUrl", imageUrl);
    try {
      await confirmUpload(imageUrl);
      await updateUserProfileImage(imageUrl);
      const updatedSession = { ...session };
      updatedSession.user.image = imageUrl;
    } catch (error) {
      console.error("Error saving changes:", error);
      setErrorMessage("Failed saving new photo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const uploadFilesToServer = async (file: File) => {
    const uploadedFile = await edgestore.publicFiles.upload({
      file,
      options: {
        temporary: true,
      },
    });

    return uploadedFile.url;
  };

  const confirmUpload = async (fileUrl: string) => {
    try {
      await edgestore.publicFiles.confirmUpload({ url: fileUrl });
    } catch (error) {
      console.error("Error confirming upload:", error);
    }
  };

  const handleEditPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    const file = event.target.files?.[0];
    if (!file) return;

    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(file.type)) {
      setErrorMessage("Only JPEG, PNG, or GIF images are allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage(
        "File size exceeds the 5MB limit. Please choose a smaller file."
      );
      setImageUrl(currentUserImage);
      return;
    }

    try {
      const tempImageUrl = URL.createObjectURL(file);
      console.log("tempImageUrl", tempImageUrl);
      setImageUrl(tempImageUrl);

      const newImageUrl = await uploadFilesToServer(file);
      console.log("newImageUrl", newImageUrl);
      setImageUrl(newImageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrorMessage("Error uploading image.");
    }
  };

  return (
    <div>
      {session && (
        <div className="flex flex-col items-center gap-12">
          <div className="relative w-[80px] h-[80px]">
            <Image
              src={imageUrl}
              alt="Avatar"
              className="object-cover rounded-full bg-[--gray-light]"
              style={{ width: "80px", height: "80px" }}
              width={80}
              height={80}
              priority
            />
            <label className="absolute bottom-0 right-0 w-6 h-6 bg-[--primary-color] text-white text-xl rounded-full flex justify-center items-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleEditPhoto}
                aria-label="Choose new photo"
              />
              +
            </label>
          </div>

          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

          <Button
            className="btn-green self-center"
            onClick={() => saveChanges()}
          >
            {loading ? "Loading..." : "Save new photo"}
          </Button>

          <div className="space-y-4">
            <p>
              <span className="font-semibold">Name: </span>{" "}
              <span>{session.user?.name}</span>
            </p>
            <p>
              <span className="font-semibold">Email: </span>
              <span>{session.user?.email}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
