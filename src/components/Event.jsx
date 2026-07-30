import styles from "../App.module.css";

export default function Event({ event }) {
  return (
    <header className={styles.header}>
      <h1>{event?.name || "Event Name"}</h1>
      <p>
        <strong>Date:</strong> {event?.date || "Date TBD"} •{" "}
        {event?.time || "Time TBD"}
      </p>
      <p>
        <strong>Location:</strong> {event?.location || "Location TBD"}
      </p>
    </header>
  );
}
