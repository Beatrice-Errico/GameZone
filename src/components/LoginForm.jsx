import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../supabase/supabase-client";
import { Link } from "react-router";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setErrorMessage("Compila tutti i campi");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMessage(error.message);
    } else {
      // Login riuscito, redirect o altro
      navigate("/");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[color:var(--color-pri)] px-4 py-12">
      <div className="max-w-md w-full bg-[#f8f9fa] rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-[color:var(--color-acc)] mb-6">
          ACCEDI
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="text-shadow-gray-700 w-full px-4 py-2 border border-[color:var(--color-sec)] rounded-lg outline-none focus:ring-2 focus:ring-[color:var(--color-sec)] bg-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="text-shadow-gray-700 w-full px-4 py-2 border border-[color:var(--color-sec)] rounded-lg outline-none focus:ring-2 focus:ring-[color:var(--color-sec)] bg-transparent"
              required
            />
          </div>

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <button
            type="submit"
            className="cursor-pointer w-full py-3 mt-4 bg-[color:var(--color-acc)] text-white font-bold rounded-lg hover:bg-pink-600 transition"
          >
            Accedi
          </button>
        </form>
          <p className="mt-4 text-center text-sm text-gray-400">
          Non hai ancora un account?{" "}
          <Link
            to="/register"
            className="text-[color:var(--color-acc)] font-semibold hover:underline"
          >
            Registrati
          </Link>
        </p>
      </div>
    </section>
  );
}
