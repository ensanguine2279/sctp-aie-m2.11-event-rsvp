import { useState, useEffect } from "react";
import axios from "axios";

import Event from "./components/Event";
import RsvpForm from "./components/RsvpForm";
import RsvpList from "./components/RsvpList";

import styles from "./App.module.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function App() {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [rsvps, setRsvps] = useState([]);

  const [isEventsLoading, setIsEventsLoading] = useState(true);
  const [isRsvpsLoading, setIsRsvpsLoading] = useState(true);
  const [eventsError, setEventsError] = useState(null);
  const [rsvpsError, setRsvpsError] = useState(null);

  // Fetch events when the App component mounts
  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      try {
        setIsEventsLoading(true);
        const response = await axios.get(`${API_BASE_URL}/events`);
        if (isMounted) {
          setEvents(response.data);
          if (response.data.length > 0) {
            setSelectedEventId(response.data[0].id); // Select the first event by default
          }
        }
      } catch (err) {
        if (isMounted) {
          setEventsError("Failed to load events.");
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setIsEventsLoading(false);
        }
      }
    };

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch RSVPs whenever the selected event changes
  useEffect(() => {
    // Prevent fetching RSVPs if selectedEventId is null or undefined
    if (!selectedEventId) return;

    let isMounted = true;

    const loadRsvps = async () => {
      try {
        setIsRsvpsLoading(true);
        setRsvpsError(null);
        setRsvps([]); // Clear previous RSVPs when loading new ones

        const response = await axios.get(`${API_BASE_URL}/rsvps`, {
          params: {
            eventId: selectedEventId,
          },
        });

        if (isMounted) {
          setRsvps(response.data);
        }
      } catch (err) {
        console.error("Failed to load RSVPs:", err);
        if (isMounted) {
          // Check if the server returned a 404 Not Found error
          if (err.response && err.response.status === 404) {
            setRsvpsError("No RSVPs found.");
            setRsvps([]); // Ensure the list is empty
          } else {
            setRsvpsError("Failed to load RSVP submissions.");
          }
        }
      } finally {
        if (isMounted) {
          setIsRsvpsLoading(false);
        }
      }
    };

    loadRsvps();

    return () => {
      isMounted = false;
    };
  }, [selectedEventId]);

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

  const handleSelectEvent = (eventId) => {
    setSelectedEventId(eventId);
  };

  return (
    <div className={styles.appContainer}>
      <h1>RSVP Dashboard</h1>
      <Event
        events={events}
        selectedEventId={selectedEventId}
        isLoading={isEventsLoading}
        error={eventsError}
        onSelectEvent={handleSelectEvent}
      />
      <main className={styles.mainContent}>
        <section className={styles.formSection}>
          <RsvpForm onSubmit={handleCreateRsvp} eventId={selectedEventId} />
        </section>

        <section className={styles.listSection}>
          <RsvpList
            rsvps={rsvps}
            isLoading={isRsvpsLoading}
            error={rsvpsError}
            onDelete={handleDeleteRsvp}
          />
        </section>
      </main>
    </div>
  );
}
