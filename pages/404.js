import { FaExclamationTriangle } from 'react-icons/fa';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/404.module.scss';

export default function NotFoundPage() {
  return (
    <Layout>
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle />
          <br /> 404
        </h1>
        <h4>Sorry, nothing to see here</h4>
        <Link href="/">
          <a>Go back home</a>
        </Link>
      </div>
    </Layout>
  );
}
