import styles from "./Event.module.css";

export default function Event({
  events,
  selectedEventId,
  isLoading,
  error,
  onSelectEvent,
}) {
  const selectedEvent = events.find((e) => e.id === selectedEventId);

  console.log("Selected Event:", selectedEvent);
  console.log("Events:", events);

  return (
    <header className={styles.header}>
      {isLoading && <p className={styles.loadingState}>Loading events...</p>}

      {error && <p className={styles.errorText}>{error}</p>}

      {!isLoading && !error && events.length === 0 && (
        <p className={styles.emptyState}>No events available.</p>
      )}

      {!isLoading && !error && events.length > 0 && (
        <>
          <div className={styles.selectorContainer}>
            <label htmlFor="event-select" className={styles.label}>
              Select Event:
            </label>
            <select
              id="event-select"
              className={styles.select}
              value={selectedEventId}
              onChange={(e) => onSelectEvent(e.target.value)}
            >
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.detailsContainer}>
            <p className={styles.detailItem}>
              <strong>Date:</strong> {selectedEvent?.date || "Date TBD"} •{" "}
              {selectedEvent?.time || "Time TBD"}
            </p>
            <p className={styles.detailItem}>
              <strong>Location:</strong>{" "}
              {selectedEvent?.location || "Location TBD"}
            </p>
          </div>
        </>
      )}
    </header>
  );
}
