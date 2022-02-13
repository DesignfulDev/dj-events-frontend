import qs from 'qs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';

export default function SearchPage({ events }) {
  const router = useRouter();

  return (
    <Layout>
      <Link href="/events">&lt; Go back</Link>
      <h1>Search results for &quot;{router.query.term}&quot;</h1>

      {events.length === 0 && <h3>No events to show</h3>}

      {events.map(e => (
        <EventItem key={e.id} evt={e} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify(
    {
      fields: ['name', 'date', 'time'],
      populate: 'image',
      sort: ['date'],
      filters: {
        $or: [
          {
            name: { $contains: term },
          },
          {
            venue: { $contains: term },
          },
          {
            performers: { $contains: term },
          },
          {
            description: { $contains: term },
          },
        ],
      },
    },
    { encodeValuesOnly: true }
  );

  const res = await fetch(`${API_URL}/api/events?${query}`);
  const { data: events } = await res.json();

  return {
    props: { events },
  };
}
