import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { trpc } from "../utils/trpc";

const Things: NextPage = () => {
  // const utils = trpc.useContext();
  const thingsQuery = trpc.useQuery(["things.read"]);
  // const createThing = trpc.useMutation("things.create", {
  //   async onSuccess() {
  //     await utils.invalidateQueries("things.read");
  //   },
  // });

  return (
    <div className={styles.container}>
      <Head>
        <title>Things</title>
        <meta
          name="description"
          content="fully-typed frontend web client template with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{thingsQuery.data?.things.length ?? 0} Things</h1>
      {thingsQuery.data?.things.map(({ id, description }) => (
        <div key={id.toString()}>{description}</div>
      ))}
    </div>
  );
};

export default Things;
