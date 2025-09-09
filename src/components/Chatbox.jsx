import { useContext } from "react";
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/supabase-client";
import RealtimeChat from "./RealtimeChat";

export default function Chatbox({ data }) {
  const { session } = useContext(SessionContext);

  const handleMessageSubmit = async (event) => {
    event.preventDefault();

    if (!session?.user) {
      alert("Devi essere autenticata per inviare messaggi.");
      return;
    }

    const inputMessage = event.currentTarget;
    const { message } = Object.fromEntries(new FormData(inputMessage));

    if (typeof message === "string" && message.trim().length !== 0) {
      const { error } = await supabase
        .from("messages")
        .insert([
          {
            profile_id: session.user.id,
            profile_username: session.user.user_metadata.username,
            game_id: data.id,
            content: message,
          },
        ])
        .select();

      if (error) {
        console.log(error);
      } else {
        inputMessage.reset();
      }
    }
  };

  return (
    <div className="w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 border border-white/20 flex flex-col">
      <h4 className="text-lg font-semibold text-white mb-3 border-b border-white/10 pb-2">
        💬 Gamers Chat
      </h4>

      {!session?.user && (
        <p className="text-white-400 text-center mb-2">
          Devi effettuare il login per inviare messaggi.
        </p>
      )}

      <div className="flex-1 overflow-y-auto mb-3 space-y-2 pr-1">
        <RealtimeChat data={data} />
      </div>

      <form onSubmit={handleMessageSubmit} className="flex gap-2">
        <input
          type="text"
          name="message"
          placeholder={session?.user ? "Scrivi un messaggio..." : "Devi loggarti per scrivere"}
          disabled={!session?.user}
          className="flex-1 rounded-xl bg-white/20 text-white placeholder-white/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 transition disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!session?.user}
          className="cursor-pointer px-3 py-2 rounded-xl bg-pri/90 hover:bg-pri/70 text-white font-semibold text-sm transition disabled:opacity-50"
        >
          Invia
        </button>
      </form>
    </div>
  );
}
