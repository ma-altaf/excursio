"use client";

import React, { useEffect, useRef, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { DocumentData } from "firebase/firestore";
import { PiSignOutBold } from "react-icons/pi";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { useAuthContext } from "@/features/users/components/authProvider";
import { linkAnomToGoogle, logOut } from "@/features/users/services/auth";
import {
  getUser,
  updateAbout,
  updateProfilePic,
  updateUsername,
} from "@/features/users/services/firestore";
import LoadingCover from "@/shared/components/loading/LoadingCover";
import { FcGoogle } from "react-icons/fc";

export default function Account() {
  const { authLoading, user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const originalUserDataRef = useRef<DocumentData>(undefined);
  const usernameBtnRef = useRef<HTMLButtonElement>(null);
  const aboutBtnRef = useRef<HTMLButtonElement>(null);
  const fileBtnRef = useRef<HTMLInputElement>(null);
  const [usernameError, setUsernameError] = useState("");

  useEffect(() => {
    if (authLoading) {
      console.log("loading auth user state");
      return;
    }

    if (!user) {
      redirect("/signin");
    }

    getUser(user.uid)
      .then((userData) => {
        if (!userData) {
          redirect("/signin");
        }
        setLoading(false);
        originalUserDataRef.current = userData;
        setUsername(userData?.username || "");
        setAbout(userData?.about || "");
        setProfilePic(userData?.imageURL || "");
      })
      .catch((e) => console.log(e));
  }, [user, authLoading]);

  if (loading) return <LoadingCover text="Loading User..." />;

  return (
    <section className="flex flex-col w-full min-h-screen items-center md:px-[10%] lg:px-[20%]">
      <h1 className="text-2xl mt-4">Edit Account</h1>
      <div className="p-2 flex flex-col w-full">
        <input
          type="file"
          name="image"
          id="image"
          className="hidden"
          ref={fileBtnRef}
          accept="image/*"
          onChange={(event) => {
            if (event.target.files) {
              updateProfilePic(user?.uid, event.target.files[0]).then(() => {
                setProfilePic(URL.createObjectURL(event.target.files![0]));
              });
            }
          }}
        />
        <button
          className="w-fit h-fit mx-auto cursor-pointer flex flex-col justify-center items-center"
          onClick={() => fileBtnRef.current?.click()}
          title="Click to change profile picture"
        >
          <Image
            className="rounded-full aspect-square w-48 object-cover pointer-events-none bg-gray-200"
            src={profilePic || "/images/profile.jpg"}
            width={640}
            height={640}
            alt="Picture of the author"
            priority
          />
          <p>Click to change image</p>
        </button>
        <span className="flex flex-col">
          <label className="" htmlFor="name">
            Name:
          </label>
          <span className="flex flex-row">
            <span className="flex w-full flex-col justify-end">
              <input
                className="border-2 border-black rounded-md p-2 w-full outline-accent"
                type="text"
                id="name"
                name="name"
                maxLength={27}
                value={username}
                onChange={(e) => {
                  if (usernameError) {
                    setUsernameError("");
                  }
                  setUsername(e.target.value);
                  if (e.target.value == originalUserDataRef.current?.username) {
                    usernameBtnRef.current!.style.display = "none";
                  } else {
                    usernameBtnRef.current!.style.display = "block";
                  }
                }}
                placeholder="Steve"
                required
              />
              <span className="flex flex-row justify-between">
                <p className="text-red-600 pl-2">{usernameError}</p>
                <p className="pr-2">{username?.length || 0}/27</p>
              </span>
            </span>

            <button
              ref={usernameBtnRef}
              className="border-2 border-accent p-button rounded-md bg-accent ml-2 h-fit hidden"
              onClick={() => {
                updateUsername(user?.uid, username)
                  .then(() => {
                    const newUsername = username.trim();
                    originalUserDataRef.current!.username = newUsername;
                    setUsername(newUsername);
                    usernameBtnRef.current!.style.display = "none";
                  })
                  .catch((error) => {
                    setUsernameError(error.message);
                  });
              }}
            >
              Update
            </button>
          </span>
        </span>
        <span className="flex flex-col">
          <label className="" htmlFor="about">
            About: (Optional)
          </label>
          <textarea
            className="border-2 border-black rounded-md py-1 px-2 outline-accent"
            rows={4}
            id="about"
            name="about"
            value={about}
            onChange={(e) => {
              setAbout(e.target.value);
              if (e.target.value == originalUserDataRef.current?.about) {
                aboutBtnRef.current!.style.display = "none";
              } else {
                aboutBtnRef.current!.style.display = "block";
              }
            }}
            placeholder="About me"
          />
          <button
            ref={aboutBtnRef}
            onClick={() => {
              console.log("about button clicked");

              updateAbout(user?.uid, about)
                .then(() => {
                  const newAbout = about.trim();
                  originalUserDataRef.current!.about = newAbout;
                  setAbout(newAbout);
                  aboutBtnRef.current!.style.display = "none";
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
            className="border-2 border-accent p-button rounded-md bg-accent w-fit mt-2 hidden"
          >
            Update
          </button>
        </span>

        {user && user.isAnonymous && (
          <button
            className="mt-3 p-button flex justify-center items-center w-full rounded-md bg-white border-gray-300 border-2"
            onClick={() => linkAnomToGoogle()}
          >
            <FcGoogle className="mr-4 size-5" />
            <p>Link with Google</p>
          </button>
        )}

        <hr className="border-black my-3" />
        <Link
          href={`user/${user?.uid}`}
          className="p-button w-full bg-accent rounded-md flex flex-row justify-center items-center font-bold"
        >
          <p>Go to user page</p>
          <FaArrowRight className="ml-4 size-5" />
        </Link>
        <button
          className="p-button rounded-md bg-gray-200 flex flex-row justify-center items-center mt-3"
          onClick={() => logOut()}
        >
          <PiSignOutBold className="mr-4 size-5 rotate-180" />
          <p>Sign Out</p>
        </button>
      </div>
    </section>
  );
}
