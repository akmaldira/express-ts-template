import { email, minLength, object, string } from "valibot";

export const loginBodySpec = object({
  email: string("Email is required", [email("Email is not valid")]),
  password: string("Password is required", [
    minLength(6, "Password must be at least 6 characters"),
  ]),
});

export const registerBodySpec = object({
  email: string("Email is required", [email("Email is not valid")]),
  password: string("Password is required", [
    minLength(6, "Password must be at least 6 characters"),
  ]),
});
