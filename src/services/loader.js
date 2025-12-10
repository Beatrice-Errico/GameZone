export const get_data = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.results; // restituisce un array di giochi
};



export const homepage_loader = async () => {
  const pageSize = 40;

  // fetch pagina 1
  const gamesPage1 = await get_data(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=${pageSize}`
  );

  // fetch pagina 2
  const gamesPage2 = await get_data(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=${pageSize}`
  );

  // unisci array
  return [...gamesPage1, ...gamesPage2];
};

export const post_loader = async ({ params }) => {


  const response = await fetch(`https://api.rawg.io/api/games/${params.id}?key=d19b80a79f394d64af19909b291d6308`);
  const game = await response.json();

  const resScreens = await fetch(`https://api.rawg.io/api/games/${params.id}/screenshots?key=d19b80a79f394d64af19909b291d6308`);
  const { results: screenshots } = await resScreens.json();

  return { game, screenshots };
};



// FUNZIONI PER FARE I FILTRI GENERE

const API_KEY = 'd19b80a79f394d64af19909b291d6308';

export const get_games_by_filters = async (filters = {}) => {
  const baseUrl = `https://api.rawg.io/api/games?key=${API_KEY}`;

  const queryParams = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      queryParams.append(key, value);
    }
  }

  const url = `${baseUrl}&${queryParams.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
};



export const games_by_genre_loader = async ({ params }) => {
  const genre = params.genre; // es. "action"
  const filters = { genres: genre };

  const games = await get_games_by_filters(filters);
  return { games };
};

// FILTRO PER PIATTAFORMA

export const platform_games_loader = async ({ params }) => {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=d19b80a79f394d64af19909b291d6308&platforms=${params.platformId}&page_size=40`
  );
  const data = await res.json();
  return { games: data.results, platformId: params.platformId, };
};

// FILTRO PER ANNO

export const year_games_loader = async ({ params }) => {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=d19b80a79f394d64af19909b291d6308&dates=${params.year}-01-01,${params.year}-12-31&page_size=40`
  );
  const data = await res.json();
  return { games: data.results, year: params.year };
};

// FILTRO PER RATING
export async function games_by_rating_loader({ params }) {
  const { rating } = params;
  // La API RAWG usa metacritic da 0 a 100, rating qui è da 1 a 5, moltiplico per 20
  const minRating = rating * 20;

  const url = `https://api.rawg.io/api/games?key=d19b80a79f394d64af19909b291d6308&metacritic=${minRating},100&page_size=100`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Errore nel caricamento giochi per rating");
  return res.json();
}


// LOADER PER SEARCHBAR

export async function search_loader({ request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  const res = await fetch(
    `https://api.rawg.io/api/games?key=d19b80a79f394d64af19909b291d6308&search=${encodeURIComponent(query)}`
  );
  const data = await res.json();

  return { games: data.results, query };
}


// LOADER REGISTER

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://txrtstqnlaervjurpbvx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cnRzdHFubGFlcnZqdXJwYnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4MzIyNDIsImV4cCI6MjA4MDQwODI0Mn0.bGEJxhdrg5KWCLb9ZI7-QCdwE9jLKrsmrW3IHVQSBqQ"
);

export async function register_loader() {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error("Errore nel recupero utente");

  // Se l'utente è già autenticato, puoi decidere di redirectare
  if (data?.user) {
    throw new Response("Already authenticated", {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  }

  return null; // nessun dato da restituire
}
