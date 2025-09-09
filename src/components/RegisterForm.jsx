import { useState } from "react";
import { Link, useNavigate } from "react-router";
import supabase from "../supabase/supabase-client";
import { ConfirmSchema, getErrors } from "../lib/validationForm";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    const fieldError = ConfirmSchema.shape[name]?.safeParse(value);
    if (!fieldError?.success) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: fieldError.error.issues.map((i) => i.message).join(", "),
      }));
    } else {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const result = ConfirmSchema.safeParse(formState);

    if (!result.success) {
      const errors = getErrors(result.error);
      setFormErrors(errors);
      console.log(errors);
      return;
    }

    const { email, password, firstName, lastName, username } = result.data;

    // 1️⃣ Signup utente su auth.users
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password
    });

    if (signUpError) {
      alert("Errore durante la registrazione: " + signUpError.message);
      return;
    }

    const user = signUpData.user;

    // 2️⃣ Creazione profilo manuale
    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,
      username,
      first_name: firstName,
      last_name: lastName,
      avatar_url: null
    });

    if (profileError) {
      alert("Errore durante la creazione del profilo: " + profileError.message);
      return;
    }

    alert("Registrazione riuscita! ✅ Controlla la tua email per confermare.");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate("/");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[color:var(--color-pri)] px-4 py-8">
      <div className="max-w-md w-full bg-[#f8f9fa] rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-[color:var(--color-acc)] mb-6">
          REGISTRATI
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {[
            { label: "Email", name: "email", type: "email" },
            { label: "Nome", name: "firstName", type: "text" },
            { label: "Cognome", name: "lastName", type: "text" },
            { label: "Username", name: "username", type: "text" },
            { label: "Password", name: "password", type: "password" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm font-semibold text-gray-400 mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                required
                value={formState[name]}
                onChange={handleChange}
                className="text-shadow-gray-700 w-full px-4 py-2 border border-[color:var(--color-sec)] rounded-lg outline-none focus:ring-2 focus:ring-[color:var(--color-sec)] bg-transparent"
              />
              {formErrors[name] && (
                <p className="text-red-500 text-sm mt-1">{formErrors[name]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className=" cursor-pointer w-full py-3 mt-4 bg-[color:var(--color-acc)] text-white font-bold rounded-lg hover:bg-pink-600 transition"
          >
            Crea Account
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Hai già un account?{" "}
          <Link
            to="/login"
            className="text-[color:var(--color-acc)] font-semibold hover:underline"
          >
            Accedi
          </Link>
        </p>
      </div>
    </section>
  );
}
