import Layout from '@/components/Layout';
import parseCookies from '@/utils/parseCookies';
import { API_URL } from '@/config/index';
import DashboardEvent from '@/components/DashboardEvent';
import getProperty from '@/utils/getProperty';
import styles from '@/styles/Dashboard.module.scss';

export default function DashboardPage({ events }) {
  const deleteEvent = id => {
    console.log(id);
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
    },
  };
}
