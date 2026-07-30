import { useState, useEffect } from "react";
import axios from "axios";

import Event from "./components/Event";
import RsvpForm from "./components/RsvpForm";
import RsvpList from "./components/RsvpList";

import styles from "./App.module.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function App() {
  const EVENT_ID = 1; // Assuming a single event for this example; in a real app, this could be dynamic

  const [event, setEvent] = useState(null);
  const [rsvps, setRsvps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch RSVPs on component mount with isMounted safety
  useEffect(() => {
    let isMounted = true;

    const loadRsvps = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_BASE_URL}/rsvps`);
        if (isMounted) {
          setRsvps(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load RSVP submissions.");
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    const loadEvent = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/events?id=${EVENT_ID}`,
        );

        if (isMounted && response.data.length === 0) {
          setError("Event not found.");
        }

        // In case the API returns more than 1 event, we take the first event
        if (isMounted && response.data.length >= 1) {
          setEvent(response.data[0]);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load event data.");
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadRsvps();
    loadEvent();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle new RSVP submission and refetch/update list
  const handleCreateRsvp = async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/rsvps`, formData);
      setRsvps((prevRsvps) => [...prevRsvps, response.data]);
    } catch (err) {
      console.error("Failed to submit RSVP:", err);
      alert("Error submitting RSVP. Please try again.");
    }
  };

  // Handle deleting an RSVP
  const handleDeleteRsvp = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/rsvps/${id}`);
      setRsvps((prevRsvps) => prevRsvps.filter((rsvp) => rsvp.id !== id));
    } catch (err) {
      console.error("Failed to delete RSVP:", err);
      alert("Error deleting RSVP. Please try again.");
    }
  };

  return (
    <div className={styles.appContainer}>
      <Event event={event} />

      <main className={styles.mainContent}>
        <section className={styles.formSection}>
          <RsvpForm onSubmit={handleCreateRsvp} />
        </section>

        <section className={styles.listSection}>
          <RsvpList
            rsvps={rsvps}
            isLoading={isLoading}
            error={error}
            onDelete={handleDeleteRsvp}
          />
        </section>
      </main>
    </div>
  );
}
