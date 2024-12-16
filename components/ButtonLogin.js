import Link from "next/link";

const ButtonLogin = ({ isLoggedIn, name, customStyle }) => {
  if (isLoggedIn)
    return (
      <Link
        href="/dashboard"
        className={`btn btn-primary ${customStyle ? customStyle : ""}`}
      >
        Welcome back {name}
      </Link>
    );

  return <button>Login</button>;
};

export default ButtonLogin;
