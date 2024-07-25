"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { ChangeEvent, useEffect, useState } from "react";

import { updateUserProfileImage } from "@/lib/actions";
import { useEdgeStore } from "@/ui/components/providers/edgestore";

import { Button } from "@/ui/components/common/button";
import { Loader } from "@/ui/components/common/loader";

export const UserProfile = () => {
  const { edgestore } = useEdgeStore();
  const { data: session, status: sessionStatus } = useSession();
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(["dashboard"]);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  useEffect(() => {
    if (session && session?.user?.image) {
      setImageUrl(session.user.image);
    }
  }, [sessionStatus, session]);

  const saveChanges = async () => {
    setLoading(true);
    try {
      let currentUserImage = await session?.user?.image;
      let newUserImage = "";

      if (!selectedFile) {
        setErrorMessage(t("error_profile_missing"));
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
      setErrorMessage(t("error_profile_save"));
    } finally {
      setLoading(false);
    }
  };

  const handleEditPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");

    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const validImageTypes = ["image/jpeg", "image/png"];
    if (!validImageTypes.includes(file.type)) {
      setErrorMessage(t("error_profile_format"));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage(t("error_profile_size"));
      return;
    }

    try {
      const tempImageUrl = URL.createObjectURL(file);

      // add image resizing before setting it in the future

      setImageUrl(tempImageUrl);
      setSelectedFile(file);
    } catch (error) {
      setErrorMessage(t("error_profile_upload"));
    }
  };

  if (!session) {
    return <Loader />;
  }

  return (
    <div>
      {session && (
        <div className="flex flex-col items-center gap-12">
          <div className="relative w-[80px] h-[80px]">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Avatar"
                className="object-cover rounded-full bg-[--gray-light]"
                style={{ width: "80px", height: "80px" }}
                width={80}
                height={80}
              />
            )}
            <label className="absolute bottom-0 right-0 w-6 h-6 bg-[--primary-color] text-white text-xl rounded-full flex justify-center items-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleEditPhoto}
                aria-label={t("profile_label")}
              />
              +
            </label>
          </div>

          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

          <Button
            className="btn-green self-center"
            onClick={() => saveChanges()}
          >
            {loading ? t("action_saving") : t("save_new_photo")}
          </Button>

          <div className="space-y-4">
            <p>
              <span className="font-semibold">{t("name")}: </span>{" "}
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
