import React, { useEffect, useState } from "react";
import { Camera, Image as ImageIcon, Link, Loader, Upload, X } from "lucide-react";
import toast from "react-hot-toast";

const AvatarUpdateModal = ({ isOpen, onClose, currentAvatar, onSave }) => {
  const [avatarUrl, setAvatarUrl] = useState(currentAvatar || "");
  const [previewUrl, setPreviewUrl] = useState(currentAvatar || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAvatarUrl(currentAvatar || "");
    setPreviewUrl(currentAvatar || "");
  }, [currentAvatar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!avatarUrl.trim()) {
      toast.error("Please enter an image URL");
      return;
    }

    setLoading(true);

    try {
      // Validate URL
      new URL(avatarUrl);

      // SSR-safe image validation
      if (typeof window !== "undefined") {
        await new Promise((resolve, reject) => {
          const img = new window.Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = avatarUrl;
        });
      }

      onSave?.(avatarUrl);
      toast.success("Avatar updated successfully!");
      onClose?.();
    } catch (err) {
      console.error(err);
      toast.error("Invalid image URL or image failed to load");
    } finally {
      setLoading(false);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setAvatarUrl(url);

    try {
      new URL(url);
      setPreviewUrl(url);
    } catch {
      setPreviewUrl("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 rounded-2xl border border-zinc-700 w-full max-w-md">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Camera size={18} /> Update Profile Picture
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Preview */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border border-zinc-700 overflow-hidden mb-2">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => setPreviewUrl("")}
                />
              ) : (
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                  <ImageIcon size={30} className="text-zinc-600" />
                </div>
              )}
            </div>
            <p className="text-xs text-zinc-400">
              {previewUrl ? "Preview" : "Enter a valid image URL"}
            </p>
          </div>

          {/* Input */}
          <div>
            <label className="text-sm text-zinc-300 mb-2 block">Image URL</label>
            <div className="relative">
              <Link size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="url"
                value={avatarUrl}
                onChange={handleUrlChange}
                placeholder="https://example.com/avatar.png"
                className="w-full pl-8 pr-4 py-3 text-xs bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 text-sm bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !avatarUrl.trim()}
              className="flex-1 py-3 text-sm bg-primary hover:bg-primary/90 rounded-lg text-white flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={16} className="animate-spin" /> Updating…
                </>
              ) : (
                <>
                  <Upload size={16} /> Update Avatar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AvatarUpdateModal;
