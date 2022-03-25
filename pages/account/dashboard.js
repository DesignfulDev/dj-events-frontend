import { useRouter } from 'next/router';
import parseCookies from '@/utils/parseCookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import DashboardEvent from '@/components/DashboardEvent';
import getProperty from '@/utils/getProperty';
import styles from '@/styles/Dashboard.module.scss';

export default function DashboardPage({ events, token }) {
  const router = useRouter();

  const deleteEvent = async id => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error.message);
      } else {
        router.reload();
      }
    }
  };

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map(evt => (
          <DashboardEvent
            key={evt.id}
            evt={evt}
            handleDelete={deleteEvent}
          ></DashboardEvent>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/api/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  // Extract events array
  const events = getProperty(data, 'data.attributes.data');

  return {
    props: {
      events,
      token,
    },
  };
}
