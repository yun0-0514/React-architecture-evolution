import { Link, Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";

const Layout = () => {
  return (
    <div className={styles.wrapper}>
      {/* 상단 네비게이션 */}
      <header className={styles.header}>
        <div className={styles.logo}>My Admin V3</div>
        <nav>
          <Link to="/" className={styles.navLink}>
            회원 관리
          </Link>
          <Link to="/products" className={styles.navLink}>
            상품 목록
          </Link>
        </nav>
      </header>

      {/* 실제 페이지 내용이 바뀌는 부분 */}
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
