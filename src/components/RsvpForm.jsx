import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { rsvpSchema, DIETARY_OPTIONS } from "../utils/data.js";

import styles from "./RsvpForm.module.css";

export default function RsvpForm({ onSubmit }) {
  // Initialize the form with react-hook-form and Yup validation
  const {
    register, // Provides methods to register input fields for validation
    handleSubmit, // Handles form submission and validation
    formState: { errors, isSubmitting }, // Contains form validation state
    reset, // Resets the form fields to their initial values
  } = useForm({
    resolver: yupResolver(rsvpSchema), // Integrates Yup validation schema with react-hook-form
    mode: "onBlur", // Validation will trigger on blur event for each field
  });

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={styles.form}
      noValidate
    >
      <h2>Event RSVP</h2>

      <div className={styles.fieldGroup}>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className={errors.name ? styles.errorInput : ""}
        />
        {errors.name && (
          <span className={styles.errorMessage}>{errors.name.message}</span>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={errors.email ? styles.errorInput : ""}
        />
        {errors.email && (
          <span className={styles.errorMessage}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="guests">Number of Guests</label>
        <input
          id="guests"
          type="number"
          {...register("guests")}
          className={errors.guests ? styles.errorInput : ""}
        />
        {errors.guests && (
          <span className={styles.errorMessage}>{errors.guests.message}</span>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="dietary">Dietary Preference</label>
        <select
          id="dietary"
          {...register("dietary")}
          className={errors.dietary ? styles.errorInput : ""}
        >
          <option value="">-- Select an option --</option>
          {DIETARY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
        {errors.dietary && (
          <span className={styles.errorMessage}>{errors.dietary.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={styles.submitButton}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
