import { useState, useEffect, useContext } from "react";
import supabase from "../supabase/supabase-client";
import FavoriteContext from "./FavoriteContext";
import SessionContext from "./SessionContext";

export default function FavoriteProvider({ children }) {
  const { session } = useContext(SessionContext);
  const userId = session?.user?.id;

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) {
      setFavorites([]);
      return;
    }

    const fetchFavorites = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.error("Errore nel caricamento preferiti:", error);
      } else {
        setFavorites(data || []);
      }
      setLoading(false);
    };

    fetchFavorites();
  }, [userId]);

  const addFavorite = async (game) => {
    if (!userId) return false;

    // Aggiorna subito lo stato locale
    const newFav = {
      user_id: userId,
      game_id: game.game_id || game.id,
      game_name: game.game_name || game.name,
      game_image: game.game_image || game.background_image,
      updated_at: new Date().toISOString(),
    };
    setFavorites((prev) => [...prev, newFav]);
    setLoading(true);

    const { error } = await supabase.from("favorites").insert([newFav]);

    setLoading(false);

    if (error) {
      console.error("Errore nell'aggiunta ai preferiti:", error);
      // rollback
      setFavorites((prev) =>
        prev.filter((fav) => fav.game_id !== newFav.game_id)
      );
      return false;
    }
    return true;
  };

  const removeFavorite = async (gameId) => {
    if (!userId) return false;

    setFavorites((prev) => prev.filter((fav) => fav.game_id !== gameId));
    setLoading(true);

    const { error } = await supabase
      .from("favorites")
      .delete()
      .match({ user_id: userId, game_id: gameId });

    setLoading(false);

    if (error) {
      console.error("Errore nella rimozione dai preferiti:", error);
      // Potresti rifetchare o fare rollback
      return false;
    }
    return true;
  };

  const isFavorite = (gameId) => {
    return favorites.some((fav) => fav.game_id === gameId);
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, loading, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
