import { useState, useEffect, useContext } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import Avatar from "../components/Avatar";
import CardGame from "../components/CardGame";
import { useFavorites } from "../context/FavoriteContext";

export default function ProfilePage() {
  const { session } = useContext(SessionContext);
  const { favorites, loading: loadingFavorites } = useFavorites();

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false); // nuovo stato per modifica

  const [profile, setProfile] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    avatar_url: "",
  });

  useEffect(() => {
    if (!session?.user?.id) return;

    const getProfile = async () => {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("profiles")
        .select("user_name, first_name, last_name, avatar_url")
        .eq("id", session.user.id)
        .single();

      if (error) {
        setErrorMessage("Errore durante il caricamento del profilo");
      } else if (data) {
        setProfile({
          user_name: data.user_name || "",
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          avatar_url: data.avatar_url || "",
        });
      }

      setLoading(false);
    };

    getProfile();
  }, [session?.user?.id]);

  const updateProfile = async (event, newAvatarUrl) => {
    if (event) event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const updates = {
      id: session.user.id,
      user_name: profile.user_name,
      first_name: profile.first_name,
      last_name: profile.last_name,
      avatar_url: newAvatarUrl ?? profile.avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);
    if (error) {
      setErrorMessage("Errore durante l'aggiornamento del profilo: " + error.message);
    } else if (newAvatarUrl) {
      setProfile((prev) => ({ ...prev, avatar_url: newAvatarUrl }));
    }

    setIsEditing(false);
    setLoading(false);
  };

  const handleAvatarUpload = async (path) => {
    await updateProfile(null, path);
  };

  if (!session?.user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Caricamento sessione...
      </div>
    );
  }

  // Sezione giochi preferiti
  let favoriteSection;
  if (loadingFavorites) {
    favoriteSection = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="h-40 bg-gray-200 animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  } else if (favorites.length === 0) {
    favoriteSection = (
      <p className="text-center text-gray-400 italic">
        Nessun gioco preferito ancora salvato.
      </p>
    );
  } else {
    favoriteSection = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favorites.map((fav) => (
          <CardGame
            key={fav.game_id}
            game={{
              id: fav.game_id,
              name: fav.game_name,
              background_image: fav.game_image,
            }}
            enableAnimations={true}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-50 p-6 bg-gray-50 rounded-2xl shadow-lg text-gray-900">
      <div className="flex flex-col items-center mb-8">
        {loading ? (
          <div className="w-32 h-32 bg-gray-200 animate-pulse rounded-full mb-4" />
        ) : (
          <Avatar url={profile.avatar_url} size={128} />
        )}
        <h1 className="text-3xl font-bold mt-4 text-center">
          {profile.first_name} {profile.last_name}
        </h1>
        <p className="text-gray-600 text-center">@{profile.user_name}</p>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="mt-4 py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition duration-300 shadow"
        >
          {isEditing ? "Annulla" : "Modifica Profilo"}
        </button>
      </div>

      {/* Form di modifica */}
      {isEditing && (
        <form
          onSubmit={updateProfile}
          className="bg-white p-6 rounded-xl shadow-md space-y-6 mb-12"
        >
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}

          <div className="flex flex-col items-center">
            <Avatar
              url={profile.avatar_url}
              size={96}
              onUpload={handleAvatarUpload}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={profile.user_name}
                onChange={(e) =>
                  setProfile({ ...profile, user_name: e.target.value })
                }
                className="mt-1 w-full border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                id="first_name"
                type="text"
                value={profile.first_name}
                onChange={(e) =>
                  setProfile({ ...profile, first_name: e.target.value })
                }
                className="mt-1 w-full border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Cognome
              </label>
              <input
                id="last_name"
                type="text"
                value={profile.last_name}
                onChange={(e) =>
                  setProfile({ ...profile, last_name: e.target.value })
                }
                className="mt-1 w-full border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-300 shadow"
            aria-busy={loading}
          >
            {loading ? "Salvataggio..." : "Salva Modifiche"}
          </button>
        </form>
      )}

      {/* Giochi preferiti */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">I tuoi giochi preferiti</h2>
        {favoriteSection}
      </div>
    </div>
  );
}
