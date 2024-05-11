import Image from "next/image";
import styles from "./page.module.css";
import GaragePage from "@/pages/garage/ui/GaragePage";

export default function Home() {
  return (
    <main className={styles.main}>
      <GaragePage/>
    </main>
  );
}
