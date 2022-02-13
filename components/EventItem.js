import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.scss';

export default function EventItem({ evt }) {
  const {
    attributes: {
      image: {
        data: {
          attributes: {
            formats: { thumbnail: img },
          },
        },
      },
    },
  } = evt;

  const dateOptions = {
    format: 'en-US',
    style: {
      // weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    },
  };

  const imgScale = 0.7;

  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={img.url ? img.url : '/images/event-default.png'}
          width={img.width * imgScale}
          height={img.height * imgScale}
          alt="DJ jamming"
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
