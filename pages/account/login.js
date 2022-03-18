import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from '@/components/Layout';
import AuthContext from '@/context/AuthContext';
import styles from '@/styles/AuthForm.module.scss';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleSubmit = e => {
    e.preventDefault();

    login({ email, password });
  };

  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>
        <ToastContainer autoClose={3000} theme="colored" />

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <input type="submit" value="Login" className="btn" />

          <p>
            Don&apos;t have an account?{' '}
            <Link href="/account/register">Register</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}
