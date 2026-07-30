import RsvpCard from "./RsvpCard";

import styles from "./RsvpList.module.css";

export default function RsvpList({ rsvps, isLoading, error, onDelete }) {
  const totalGuests = rsvps.reduce((sum, rsvp) => sum + Number(rsvp.guests), 0);

  return (
    <div className={styles.listContainer}>
      <h2>Submitted RSVPs</h2>
      <p>Total Confirmed Guests: {totalGuests}</p>

      {isLoading && (
        <p className={styles.loadingState}>Loading submissions...</p>
      )}

      {error && <p className={styles.errorText}>{error}</p>}

      {!isLoading && !error && rsvps.length === 0 && (
        <p className={styles.emptyState}>No RSVPs submitted yet.</p>
      )}

      {!isLoading && !error && rsvps.length > 0 && (
        <ul className={styles.rsvpList}>
          {rsvps.map((rsvp) => (
            <RsvpCard key={rsvp.id} rsvp={rsvp} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
}
