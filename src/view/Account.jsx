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
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    username: "",
    first_name: "",
    last_name: "",
    avatar_url: "",
  });

  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;

    const getProfile = async () => {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("profiles")
        .select("username, first_name, last_name, avatar_url")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Errore caricamento profilo:", error);
        setErrorMessage("Errore durante il caricamento del profilo");
      } else if (data) {
        setProfile({
          username: data.username || "",
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          avatar_url: data.avatar_url || "",
        });
      }

      setLoading(false);
    };

    getProfile();
  }, [userId]);

  const updateProfile = async (event, newAvatarUrl) => {
    if (event) event.preventDefault();
    if (!userId) return;

    setLoading(true);
    setErrorMessage("");

    const updates = {
      id: userId,
      username: profile.username,
      first_name: profile.first_name,
      last_name: profile.last_name,
      avatar_url: newAvatarUrl ?? profile.avatar_url,
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      console.error("Errore update profilo:", error);
      setErrorMessage(
        "Errore durante l'aggiornamento del profilo: " + error.message
      );
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
      <div className="flex justify-center items-center h-screen bg-black text-gray-400">
        Caricamento sessione...
      </div>
    );
  }

  // Sezione giochi preferiti
  let favoriteSection;
  if (loadingFavorites) {
    favoriteSection = (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="h-40 bg-slate-800/60 animate-pulse rounded-xl border border-slate-700/60"
          />
        ))}
      </div>
    );
  } else if (!favorites || favorites.length === 0) {
    favoriteSection = (
      <div className="flex flex-col items-center justify-center py-10 text-slate-400">
        <p className="italic mb-2">Nessun gioco preferito ancora salvato.</p>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          clicca il cuore su un gioco per aggiungerlo qui
        </p>
      </div>
    );
  } else {
    favoriteSection = (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
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

  const fullName = `${profile.first_name ?? ""} ${profile.last_name ?? ""}`
    .trim()
    || "GameZone Player";

  const favoritesCount = favorites?.length ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050816] via-[#070b20] to-[#050816] text-slate-50 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        {/* HEADER TITOLO */}
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--color-acc)]/70 mb-2">
            GameZone // Player Profile
          </p>
          <h1
  className="text-3xl md:text-4xl font-extrabold tracking-tight"
  style={{ fontFamily: "Anton, system-ui, sans-serif" }}
>
            Area personale
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-xl">
            Gestisci il tuo profilo, personalizza il tuo nickname e tieni d&apos;occhio i tuoi titoli preferiti.
          </p>
        </header>

        <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)] gap-8 items-start">
          {/* CARD PROFILO */}
          <section className="bg-slate-900/70 border border-slate-700/70 rounded-2xl p-6 md:p-7 shadow-[0_0_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
            {/* Glow decorativo */}
            <div className="pointer-events-none absolute -top-32 -right-10 w-60 h-60 rounded-full bg-[color:var(--color-acc)]/20 blur-3xl" />
            <div className="relative z-10">
              <div className="flex flex-col items-center text-center">
                {loading ? (
                  <div className="w-28 h-28 bg-slate-800 animate-pulse rounded-full mb-4 border border-slate-700" />
                ) : (
                  <div className="relative mb-4">
                    <div className="absolute inset-0 rounded-full bg-[color:var(--color-acc)]/40 blur-md" />
                    <div className="relative rounded-full border-2 border-[color:var(--color-acc)]/80 p-1">
                      <Avatar url={profile.avatar_url} size={110} />
                    </div>
                  </div>
                )}

                <h2 className="text-2xl font-bold">{fullName}</h2>
                <p className="text-sm text-slate-400 mt-1">
                  {profile.username ? (
                    <span className="font-mono text-[13px] bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700/70">
                      @{profile.username}
                    </span>
                  ) : (
                    <span className="font-mono text-[13px] text-slate-500">
                      @username
                    </span>
                  )}
                </p>

                {/* MINI STATS */}
                <div className="mt-5 flex flex-wrap gap-3 justify-center text-xs md:text-sm">
                  <div className="px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700/80 flex flex-col items-center min-w-[90px]">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                      Preferiti
                    </span>
                    <span className="text-lg font-bold text-[color:var(--color-acc)]">
                      {favoritesCount}
                    </span>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700/80 flex flex-col items-center min-w-[90px]">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                      Stato
                    </span>
                    <span className="text-sm font-semibold">Online</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing((prev) => !prev)}
                  className="mt-6 py-2.5 px-6 bg-[color:var(--color-acc)] hover:bg-pink-600 text-white text-sm font-semibold rounded-full transition duration-200 shadow-lg shadow-[color:var(--color-acc)]/30"
                >
                  {isEditing ? "Annulla modifica" : "Modifica profilo"}
                </button>
              </div>

              {/* FORM MODIFICA */}
              {isEditing && (
                <form
                  onSubmit={updateProfile}
                  className="mt-7 bg-slate-950/50 border border-slate-800/80 rounded-2xl p-5 space-y-5"
                >
                  {errorMessage && (
                    <p className="text-red-400 text-sm text-center mb-2">
                      {errorMessage}
                    </p>
                  )}

                  <div className="flex flex-col items-center mb-3">
                    <Avatar
                      url={profile.avatar_url}
                      size={80}
                      onUpload={handleAvatarUpload}
                    />
                    <p className="text-[11px] text-slate-500 mt-2">
                      Clicca sull&apos;avatar per caricare una nuova immagine
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-xs font-semibold text-slate-300 uppercase tracking-[0.18em]"
                      >
                        Username
                      </label>
                      <input
                        id="username"
                        type="text"
                        value={profile.username}
                        onChange={(e) =>
                          setProfile({ ...profile, username: e.target.value })
                        }
                        className="mt-1 w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-acc)]/70"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="first_name"
                          className="block text-xs font-semibold text-slate-300 uppercase tracking-[0.18em]"
                        >
                          Nome
                        </label>
                          <input
                          id="first_name"
                          type="text"
                          value={profile.first_name}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              first_name: e.target.value,
                            })
                          }
                          className="mt-1 w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-acc)]/70"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="last_name"
                          className="block text-xs font-semibold text-slate-300 uppercase tracking-[0.18em]"
                        >
                          Cognome
                        </label>
                        <input
                          id="last_name"
                          type="text"
                          value={profile.last_name}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              last_name: e.target.value,
                            })
                          }
                          className="mt-1 w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-acc)]/70"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 py-2.5 bg-[color:var(--color-acc)] hover:bg-pink-600 text-white text-sm font-semibold rounded-xl transition duration-200 shadow-lg shadow-[color:var(--color-acc)]/30 disabled:opacity-60"
                  >
                    {loading ? "Salvataggio..." : "Salva modifiche"}
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* SEZIONE PREFERITI */}
          <section className="bg-slate-900/60 border border-slate-700/70 rounded-2xl p-5 md:p-7 shadow-[0_0_40px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold">
                  I tuoi giochi preferiti
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Libreria personale // {favoritesCount} titolo
                  {favoritesCount === 1 ? "" : "i"}
                </p>
              </div>
            </div>

            {favoriteSection}
          </section>
        </div>
      </div>
    </div>
  );
}
