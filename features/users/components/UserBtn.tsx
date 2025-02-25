"use client";

import Link from "next/link";
import { useAuthContext } from "./authProvider";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getUser, UserDetails } from "../services/firestore";

export default function UserBtn() {
  const { authLoading, user } = useAuthContext();
  const [userDetails, setUserDetails] = useState<UserDetails | undefined>(
    undefined
  );

  useEffect(() => {
    if (!authLoading && user) {
      getUser(user.uid).then((res) => setUserDetails(res));
    }
  }, [authLoading, user]);

  if (authLoading)
    return (
      <div className="w-24 h-10 rounded-md bg-gray-200 animate-pulse"></div>
    );

  return userDetails ? (
    <Link
      href={`/user/${user?.uid}`}
      className="flex flex-row items-center px-2 py-1 w-fit rounded-md bg-gray-200"
    >
      <p className="m-1">{userDetails?.username}</p>
      <Image
        src={`${userDetails?.imageURL || "/images/user_pp.webp"}`}
        width={64}
        height={64}
        alt="user profile"
        className="rounded-full size-8 aspect-square object-cover object-center"
      />
    </Link>
  ) : (
    <Link
      href="/signin"
      className="flex flex-row items-center px-2 py-1 w-fit rounded-md bg-gray-200"
    >
      Sign In
    </Link>
  );
}
