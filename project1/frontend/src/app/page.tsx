import Link from "next/link";
import styles from "./page.module.css";

export default function Home(){
  return (
  <main className={styles.main}>
      <nav className={styles.nav}>
          <button className={styles.button}>
              <Link href={"/reserve"}>예약 하기</Link>
          </button>
          <button className={styles.button}>
              <Link href={"/reservations"}>예약 목록</Link>
          </button>
          <button className={styles.button}>
              예약 상세 조회
          </button>
          <button className={styles.button}>상태 변경</button>
      </nav>
  </main>
  );
}
