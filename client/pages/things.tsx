import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";
import { trpc } from "../utils/trpc";

// TODO: styled-components
import styles from "../styles/Things.module.css";

const Things: NextPage = () => {
  const utils = trpc.useContext();
  const thingsQuery = trpc.useQuery(["things.read"]);
  const thingMutation = trpc.useMutation("things.create", {
    async onSuccess() {
      await utils.invalidateQueries("things.read");
    },
  });

  const [description, setDescription] = useState("");
  const createThing = useCallback(() => {
    thingMutation.mutate({ description }), setDescription("");
  }, [thingMutation, description]);

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
      <div className={styles["thing-container"]}>
        {thingsQuery.data?.things.map(({ id, description }) => (
          <div key={id.toString()} className={styles["thing-card"]}>
            {description}
          </div>
        ))}
      </div>
      <form onSubmit={createThing}>
        <label>Create New Thing</label>
        <br />
        <input
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <input type="submit" value="Create"></input>
      </form>
    </div>
  );
};

export default Things;
