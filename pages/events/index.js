import qs from 'qs';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';

export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1>Events</h1>

      {events.length === 0 && <h3>No events to show</h3>}

      {events.map(e => (
        <EventItem key={e.id} evt={e} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const query = qs.stringify(
    {
      populate: '*',
      sort: ['date'],
    },
    { encodeValuesOnly: true }
  );

  const res = await fetch(`${API_URL}/api/events?${query}`);
  const { data: events } = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
