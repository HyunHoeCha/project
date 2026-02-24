import Link from "next/link";
import styles from "./page.module.css";

export default function Home(){
  return (
  <main className={styles.main}>
      <nav className={styles.nav}>

          <Link href={"/reserve"}>
              <button className={styles.button}>예약 하기</button>
          </Link>

          <Link href={"/reservations"}>
              <button className={styles.button}>예약 목록</button>
          </Link>

          <Link href={"/search"}>
              <button className={styles.button}>예약 조회</button>
          </Link>

          <button className={styles.button}>상태 변경</button>
      </nav>
  </main>
  );
}
