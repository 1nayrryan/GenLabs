"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SubmitProjectForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setUploading(true);

    let imageUrl = "";

    if (imageFile && supabase) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from("project-images")
        .upload(fileName, imageFile);

      if (!error && data) {
        const {
          data: { publicUrl },
        } = supabase.storage.from("project-images").getPublicUrl(data.path);
        imageUrl = publicUrl;
      }
    }

    // TODO: Insert project into Supabase with imageUrl
    console.log("Project image URL:", imageUrl);
    console.log("Form data:", Object.fromEntries(form));

    setUploading(false);
    alert("Project submitted! (Demo mode — connect Supabase to save)");
    (e.target as HTMLFormElement).reset();
    setImageFile(null);
    setImagePreview(null);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label className="block text-sm font-semibold mb-2">Title</label>
        <input name="title" required className="input-field" />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Summary</label>
        <input name="summary" required className="input-field" />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Team Members
        </label>
        <input
          name="team_members"
          placeholder="Comma-separated names"
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Description
        </label>
        <textarea
          name="description"
          rows={5}
          className="input-field resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Project Image
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-line rounded-card p-6 text-center cursor-pointer hover:border-ink transition-colors"
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-40 mx-auto rounded-lg object-cover"
            />
          ) : (
            <div>
              <svg
                className="mx-auto mb-2 text-muted"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <p className="text-sm text-muted">
                Click to upload a screenshot
              </p>
              <p className="text-xs text-muted/60 mt-1">PNG, JPG up to 5MB</p>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Status</label>
        <select name="status" className="input-field">
          <option value="seeking">Seeking collaborators</option>
          <option value="building">In progress</option>
          <option value="launched">Launched</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          External Link
        </label>
        <input
          name="external_link"
          placeholder="https://..."
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Your Email</label>
        <input name="email" type="email" required className="input-field" />
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="bg-ink text-paper font-semibold px-6 py-3 rounded-pill hover:bg-ink/80 transition-colors disabled:opacity-50"
      >
        {uploading ? "Submitting..." : "Submit project"}
      </button>
    </form>
  );
}
