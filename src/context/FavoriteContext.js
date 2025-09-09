import { createContext, useContext } from "react";

const FavoriteContext = createContext();

export function useFavorites() {
  return useContext(FavoriteContext);
}

export default FavoriteContext;
