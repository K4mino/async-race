import Image from "next/image";
import styles from "./page.module.css";
import { Garage } from "@/pages/garage";

export default function Home() {
  return (
    <main className={styles.main}>
      <Garage/>
    </main>
  );
}
