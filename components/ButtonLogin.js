import Link from "next/link";

const ButtonLogin = ({ session, customStyle }) => {
  if (session)
    return (
      <Link
        href="/dashboard"
        className={`btn btn-primary ${customStyle ? customStyle : ""}`}
      >
        Welcome back {session.user.name || "friend"}
      </Link>
    );

  return <button>Login</button>;
};

export default ButtonLogin;
