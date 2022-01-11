import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>TS Frontend Template</title>
        <meta
          name="description"
          content="fully-typed frontend web client template with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>TS Frontend Template</h1>
        <p className={styles.description}>
          fully-typed frontend web client template with Next.js
        </p>
      </main>

      <footer className={styles.footer}>
        <p>
          by{" "}
          <a href="https://www.justinxu.me/" target="_blank" rel="noreferrer">
            Justin Xu
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
