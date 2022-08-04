import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// import ManualHeader from "../components/ManualHeader";
import Header from "../components/Header";
import Token from "../components/Token";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sella</title>
        <meta name="description" content="Sella Smart Contract" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
      </Header>
      Hello im from index
      <Token>
      </Token>
    </div>
  );
}
