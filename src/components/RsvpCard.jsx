import styles from "./RsvpCard.module.css";

export default function RsvpCard({ rsvp, onDelete }) {
  console.log("Rendering RsvpCard for:", rsvp);
  return (
    <li className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.name}>{rsvp.name}</span>
        <span className={styles.guests}>
          {rsvp.guests} guest{rsvp.guests > 1 ? "s" : ""}
        </span>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.email}>{rsvp.email}</p>
        <p className={styles.dietary}>
          Dietary: <strong>{rsvp.dietary || "None"}</strong>
        </p>
      </div>
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(rsvp.id)}
        aria-label={`Delete RSVP for ${rsvp.name}`}
        title="Delete RSVP"
      >
        &times;
      </button>
    </li>
  );
}
