import qs from 'qs';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import Pagination from '@/components/Pagination';
import { API_URL } from '@/config/index';

export default function EventsPage({ events, page, pageCount }) {
  return (
    <Layout>
      <h1>Events</h1>

      {events.length === 0 && <h3>No events to show</h3>}

      {events.map(e => (
        <EventItem key={e.id} evt={e} />
      ))}

      <Pagination page={page} pageCount={pageCount} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const query = qs.stringify(
    {
      fields: ['name', 'slug', 'date', 'time'],
      populate: 'image',
      sort: ['date:asc'],
      pagination: {
        page,
      },
    },
    { encodeValuesOnly: true }
  );

  const res = await fetch(`${API_URL}/api/events?${query}`);
  const {
    data: events,
    meta: {
      pagination: { pageCount, total },
    },
  } = await res.json();

  return {
    props: { events, page: +page, pageCount, total },
  };
}
