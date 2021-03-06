import qs from 'qs';
import Link from 'next/link';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>

      {events.length === 0 && <h3>No events to show</h3>}

      {events.map(e => (
        <EventItem key={e.id} evt={e} />
      ))}

      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View all events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const query = qs.stringify(
    {
      fields: ['name', 'slug', 'date', 'time'],
      populate: 'image',
      sort: ['date'],
      pagination: {
        start: 0,
        limit: 3,
      },
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
