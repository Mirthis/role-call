import { type NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <div className="hero min-h-[90vh] bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-5xl font-extrabold leading-none text-transparent">
              Step into a world of endless possibilities
            </h1>
            <p className="py-6">
              Create your own story and bring your characters to life with our
              immersive role-playing chat bot. Let your imagination run wild and
              embark on a journey like no other.
            </p>
            <Link href="/chat">
              <button className="btn-primary btn">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
