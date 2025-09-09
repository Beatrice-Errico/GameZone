import { z } from "zod";

const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
const passwordError =
  "La password deve contenere almeno una lettera maiuscola, una minuscola e un numero.";

export const FormSchema = z.object({
  email: z.string().email("Email non valida"),
  firstName: z.string().min(1, "Il nome è obbligatorio"),
  lastName: z.string().min(1, "Il cognome è obbligatorio"),
  username: z.string().min(3, "Lo username deve avere almeno 3 caratteri"),
  password: z
    .string()
    .min(8, "Minimo 8 caratteri")
    .regex(passwordRegex, passwordError),
});

// Optional: validazione finale su tutto il form (es. password uguali)
export const ConfirmSchema = FormSchema.refine((data) => data);

export function getFieldError(property, value) {
  const { error } = FormSchema.shape[property].safeParse(value);
  return error ? error.issues.map((i) => i.message).join(", ") : undefined;
}

export function getErrors(error) {
  return error.issues.reduce((all, issue) => {
    const path = issue.path.join("");
    const message = all[path] ? all[path] + ", " : "";
    all[path] = message + issue.message;
    return all;
  }, {});
}
