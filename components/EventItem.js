import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.scss';
import getProperty from '@/utils/getProperty';

export default function EventItem({ evt }) {
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

  const imgScale = 0.9;

  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            img
              ? img.attributes.formats.thumbnail.url
              : '/images/event-default.png'
          }
          width={
            img
              ? img.attributes.formats.thumbnail.width * imgScale
              : 164 * imgScale
          }
          height={
            img
              ? img.attributes.formats.thumbnail.height * imgScale
              : 110 * imgScale
          }
          alt="DJ jamming"
          priority={true}
        />
      </div>

      <div className={styles.info}>
        <span>
          {new Date(evt.attributes.date).toLocaleDateString(
            dateOptions.format,
            dateOptions.style
          )}{' '}
          at {evt.attributes.time}
        </span>
        <h3>{evt.attributes.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${evt.attributes.slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
}
