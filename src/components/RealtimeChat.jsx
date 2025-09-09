import { useEffect, useState, useRef, useCallback } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import supabase from "../supabase/supabase-client";

dayjs.extend(relativeTime);

export default function RealtimeChat({ data }) {
  const [messages, setMessages] = useState([]);
  const messageRef = useRef(null);

  const scrollToBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  };

  const getMessages = useCallback(async () => {
    const { data: msgs, error } = await supabase
      .from("messages")
      .select()
      .eq("game_id", data?.id)
      .order("created_at", { ascending: true });

    if (!error) {
      setMessages(msgs);
    }
  }, [data?.id]);

  useEffect(() => {
    if (data) {
      getMessages();
    }

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => getMessages()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [data, getMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="space-y-2" ref={messageRef}>
      {messages.map((msg) => (
        <div key={msg.id} className="bg-white/20 rounded-lg p-2 text-sm text-white">
          <p className="font-semibold">{msg.profile_username}</p>
          <p>{msg.content}</p>
          <small className="opacity-60 text-xs">
            {dayjs().to(dayjs(msg.created_at))}
          </small>
        </div>
      ))}
    </div>
  );
}
