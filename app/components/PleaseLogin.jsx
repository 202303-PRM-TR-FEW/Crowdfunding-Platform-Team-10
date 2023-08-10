import Link from "next-intl/link";

const PleaseLogin = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center gap-10 items-center text-center">
        <h1 className="header-3">Please Login To See This Page</h1>
        <Link className="btn-primary w-64 " href="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default PleaseLogin;
