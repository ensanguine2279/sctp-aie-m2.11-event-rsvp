import * as yup from "yup";

// Define allowed options as a constant for reuse
export const DIETARY_OPTIONS = ["none", "halal", "vegetarian", "vegan"];

// originalValue captures the raw input value before Yup tries to validate or cast it
// (which in the case of an empty field is ""). If the field is blank (""), it transforms
// the value into undefined. When Yup sees undefined, it bypasses the .typeError() check
// and correctly triggers your .required('Number of guests is required') validation instead.
//
// If  an empty string "" is passed into Yup's number validator, it fails and throws a
// .typeError('Must be a number'). This creates a frustrating user experience where a user
// clicks into the input, clears it to type a new number, and immediately sees a red "Must be
// a number" error before they even finish typing.
export const rsvpSchema = yup
  .object({
    name: yup.string().required("Name is required"),

    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),

    guests: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value,
      )
      .typeError("Must be a number")
      .min(1, "At least 1 guest required")
      .max(10, "Maximum 10 guests allowed")
      .required("Number of guests is required"),

    dietary: yup
      .string()
      .oneOf(DIETARY_OPTIONS, "Please select a valid dietary preference")
      .required("Please select a dietary option"),
  })
  .required();
