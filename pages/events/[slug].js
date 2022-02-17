import qs from 'qs';
import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.scss';
import getProperty from '../../utils/getProperty';
import router from 'next/router';

export default function EventPage({ evt }) {
  const deleteEvent = async e => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error.message);
      } else {
        router.push('/events');
      }
    }
  };

  const dateOptions = {
    format: 'en-US',
    style: {
      // weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    },
  };

  const img = getProperty(evt, 'attributes.image.data');

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Evente
          </a>
        </div>

        <span>
          {new Date(evt.attributes.date).toLocaleDateString(
            dateOptions.format,
            dateOptions.style
          )}{' '}
          at {evt.attributes.time}
        </span>

        <h1>{evt.attributes.name}</h1>
        <ToastContainer autoClose={3000} theme="colored" />

        <div className={styles.image}>
          <Image
            src={
              img
                ? img.attributes.formats.large.url
                : '/images/event-default.png'
            }
            width={img ? img.attributes.formats.large.width : 960}
            height={img ? img.attributes.formats.large.height : 600}
            alt="DJ jamming"
          />
        </div>

        <h3>Performers:</h3>
        <p>{evt.attributes.performers}</p>
        <h3>Description:</h3>
        <p>{evt.attributes.description}</p>
        <h3>Venue:</h3>
        <p>{evt.attributes.venue}</p>
        <p>{evt.attributes.address}</p>

        <Link href="/events">
          <a className={styles.back}>&lt; Go back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  const { data: events } = await res.json();

  const paths = events.map(evt => ({
    params: { slug: evt.attributes.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: '*',
    },
    { encodeValuesOnly: true }
  );

  const res = await fetch(`${API_URL}/api/events?${query}`);

  const { data: events } = await res.json();

  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);

//   const events = await res.json();

//   return {
//     props: {
//       evt: events[0],
//     },
//   };
// }
