import Link from 'next/link';
import styles from '@/styles/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; DJ Events 2021</p>
      <Link href="/about">
        <a>About this project</a>
      </Link>
    </footer>
  );
}
