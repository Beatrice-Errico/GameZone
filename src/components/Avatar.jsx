import { useEffect, useState } from "react";
import supabase from "../supabase/supabase-client";
import { Camera } from "lucide-react";


export default function Avatar({ url, size = 96, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) throw error;

      const avatarBlobUrl = URL.createObjectURL(data);
      setAvatarUrl(avatarBlobUrl);
    } catch (error) {
      console.error("Errore nel download dell’immagine:", error.message);
    }
  };

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) throw new Error("Seleziona un’immagine da caricare.");

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      if (onUpload) onUpload(filePath); // <-- chiama onUpload solo se esiste
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative group inline-block">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="rounded-full object-cover border border-gray-300 shadow-md transition-all duration-300"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="bg-gray-200 rounded-full animate-pulse"
          style={{ height: size, width: size }}
        />
      )}

      {/* Overlay con icona della fotocamera */}
      <label
        htmlFor="avatar-upload"
        className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        style={{ height: size, width: size }}
      >
        <Camera className="text-white w-6 h-6" />
      </label>

      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
        className="hidden"
      />
    </div>
  );
}
