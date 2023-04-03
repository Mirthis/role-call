import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();

  return (
    <div className="bg-base-300">
      <div className="navbar mx-auto max-w-6xl">
        <div className="navbar-start">
          <Link href="/" className="btn-ghost btn text-xl normal-case">
            Role Call
          </Link>
        </div>

        {router.pathname !== "/" && (
          <>
            {/* <div className="navbar-center">
              <a className="btn-ghost btn">About</a>
              <a className="btn-ghost btn">Contact</a>
            </div> */}
            <div className="navbar-end">
              <Link href="/new" className="btn">
                New Chat
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
