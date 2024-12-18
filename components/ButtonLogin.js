"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";

const ButtonLogin = ({ session, customStyle }) => {
  const dashboardUrl = "/dashboard";

  if (session)
    return (
      <Link
        href={dashboardUrl}
        className={`btn btn-primary ${customStyle ? customStyle : ""}`}
      >
        Welcome back {session.user.name || "friend"}
      </Link>
    );

  return (
    <button
      className={`btn btn-primary ${customStyle ? customStyle : ""}`}
      onClick={() => {
        signIn(undefined, {
          callbackUrl: dashboardUrl,
        });
      }}
    >
      Get Started
    </button>
  );
};

export default ButtonLogin;
