import RsvpCard from "./RsvpCard";

import styles from "./RsvpList.module.css";

export default function RsvpList({ rsvps, isLoading, error, onDelete }) {
  return (
    <div className={styles.listContainer}>
      <h2>Submitted RSVPs</h2>

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
