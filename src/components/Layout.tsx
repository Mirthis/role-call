import Head from "next/head";
import Navbar from "./NavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Role Call</title>
        <meta
          name="description"
          content="Role play with your favourite (or not) character"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="mx-auto max-w-6xl">
        <main className="py-3 px-2">{children}</main>
      </div>
    </>
  );
};

export default Layout;
