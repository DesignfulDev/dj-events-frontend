import qs from 'qs';
import moment from 'moment';
import { FaImage } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import ImageUpload from '@/components/ImageUpload';
import { API_URL } from '@/config/index';
import getProperty from '@/utils/getProperty';
import styles from '@/styles/Form.module.scss';

export default function EditEventPage({ evt }) {
  const evtDetails = getProperty(evt, 'data.attributes');
  const img = getProperty(evtDetails, 'image.data');

  const [values, setValues] = useState({
    name: evtDetails.name,
    venue: evtDetails.venue,
    address: evtDetails.address,
    date: evtDetails.date,
    time: evtDetails.time,
    performers: evtDetails.performers,
    description: evtDetails.description,
  });

  const [imagePreview, setImagePreview] = useState(
    img ? img.attributes.formats.thumbnail.url : null
  );

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some(
      element => element === ''
    );

    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
    }

    const res = await fetch(`${API_URL}/api/events/${evt.data.id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: values }),
    });

    if (!res.ok) {
      toast.error('Something went wrong.');
    } else {
      const evt = await res.json();

      router.push(`/events/${evt.data.attributes.slug}`);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async e => {
    const res = await fetch(`${API_URL}/api/events/${evt.data.id}?populate=*`);
    const data = await res.json();

    setImagePreview(
      data.data.attributes.image.data.attributes.formats.thumbnail.url
    );
    setShowModal(false);
  };

  return (
    <Layout>
      <Link href="/events">&lt; Go back</Link>
      <h1>Edit Event</h1>
      <ToastContainer autoClose={3000} theme="colored" />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={moment(values.date).format('yyyy-MM-DD')}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input className="btn" type="submit" value="Update Event" />
      </form>

      <h3>Event Image</h3>
      {imagePreview ? (
        <Image
          src={imagePreview}
          height={img ? img.attributes.formats.thumbnail.height : 100}
          width={img ? img.attributes.formats.thumbnail.width : 170}
          alt="Event image"
        />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={evt.data.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const query = qs.stringify(
    {
      populate: '*',
    },
    { encodeValuesOnly: true }
  );

  const res = await fetch(`${API_URL}/api/events/${id}?${query}`);
  const evt = await res.json();

  return {
    props: {
      evt,
    },
  };
}
