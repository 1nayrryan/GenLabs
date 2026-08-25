"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CATEGORY_OPTIONS, SKILL_OPTIONS } from "@/lib/constants";

export default function SubmitProjectForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState("");
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

    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();

      const teamMembers = form.get("team_members") as string;
      const lookingFor = form.get("looking_for") as string;

      await supabase.from("projects").insert({
        title: form.get("title"),
        summary: form.get("summary"),
        description: form.get("description") || "",
        status: form.get("status"),
        tags: [...selectedCategories, ...selectedSkills],
        team_members: teamMembers
          ? teamMembers.split(",").map((s: string) => s.trim())
          : [],
        looking_for: lookingFor
          ? lookingFor.split(",").map((s: string) => s.trim())
          : [],
        owner_id: user?.id || null,
        external_link: form.get("external_link") || "",
        image_url: imageUrl || null,
      });

      setSubmitted(true);
    } else {
      alert("Project submitted! (Demo mode — connect Supabase to save)");
    }

    setUploading(false);
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-grass/10 text-grass font-mono text-sm font-medium rounded-pill mb-4">
          [ POSTED ]
        </div>
        <h2 className="text-xl font-bold tracking-tight mb-2">
          Project submitted!
        </h2>
        <p className="text-sm text-muted mb-6">
          Your project is now live on the builds page.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setImageFile(null);
            setImagePreview(null);
            setSelectedCategories([]);
            setSelectedSkills([]);
          }}
          className="text-sm font-semibold underline underline-offset-4 hover:text-muted transition-colors"
        >
          Submit another
        </button>
      </div>
    );
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
          Project Type
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat}
              type="button"
              data-active={selectedCategories.includes(cat)}
              className="chip"
              onClick={() =>
                setSelectedCategories((prev) =>
                  prev.includes(cat)
                    ? prev.filter((c) => c !== cat)
                    : [...prev, cat]
                )
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Skills Required
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {SKILL_OPTIONS.map((skill) => (
            <button
              key={skill}
              type="button"
              data-active={selectedSkills.includes(skill)}
              className="chip"
              onClick={() =>
                setSelectedSkills((prev) =>
                  prev.includes(skill)
                    ? prev.filter((s) => s !== skill)
                    : [...prev, skill]
                )
              }
            >
              {skill}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            placeholder="Custom skill"
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            className="input-field flex-1"
          />
          <button
            type="button"
            onClick={() => {
              if (customSkill.trim()) {
                setSelectedSkills((prev) => [...prev, customSkill.trim()]);
                setCustomSkill("");
              }
            }}
            className="bg-mist text-ink font-medium px-4 rounded-pill text-sm hover:bg-line transition-colors"
          >
            Add
          </button>
        </div>
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
          Looking For
        </label>
        <input
          name="looking_for"
          placeholder="e.g. Backend developer, UI designer"
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
          placeholder="https://github.com/user/repo"
          className="input-field"
        />
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
