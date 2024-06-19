"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { Button } from "@/ui/components/button";
import { useEdgeStore } from "@lib/edgestore";
import { updateUserProfileImage } from "@lib/actions";
import { Loader } from "@/ui/components/loader";

const UserProfile = () => {
  const { edgestore } = useEdgeStore();
  const { data: session, status: sessionStatus } = useSession();
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  useEffect(() => {
    if (sessionStatus === "authenticated" && session?.user?.image) {
      setImageUrl(session.user.image);
    }
  }, [sessionStatus, session]);

  const saveChanges = async () => {
    setLoading(true);
    try {
      let currentUserImage = await session?.user?.image;
      let newUserImage = "";

      if (!selectedFile) {
        return;
      }

      if (selectedFile) {
        let res;

        if (currentUserImage.startsWith("https://files.edgestore.dev")) {
          res = await edgestore.publicFiles.upload({
            file: selectedFile,
            options: {
              replaceTargetUrl: currentUserImage,
            },
          });
          newUserImage = res.url;
        } else {
          res = await edgestore.publicFiles.upload({
            file: selectedFile,
          });
          newUserImage = res.url;
        }
      }

      await updateUserProfileImage(newUserImage);

      const updatedSession = { ...session };
      updatedSession.user.image = newUserImage;
    } catch (error) {
      setErrorMessage("Failed saving new photo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");

    const file = event.target.files?.[0];
    if (!file) return;

    const validImageTypes = ["image/jpeg", "image/png"];
    if (!validImageTypes.includes(file.type)) {
      setErrorMessage("Only JPEG or PNG images are allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage(
        "File size exceeds the 5MB limit. Please choose a smaller file."
      );
      return;
    }

    try {
      const tempImageUrl = URL.createObjectURL(file);

      // add image resizing before setting it in the future

      setImageUrl(tempImageUrl);
      setSelectedFile(file);
    } catch (error) {
      setErrorMessage("Error uploading image.");
    }
  };

  if (sessionStatus === "loading") {
    return <Loader />;
  }

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
            {loading ? "Saving..." : "Save new photo"}
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
