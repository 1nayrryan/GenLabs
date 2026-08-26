"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CATEGORY_OPTIONS, SKILL_OPTIONS } from "@/lib/constants";

const ADMIN_ID = process.env.NEXT_PUBLIC_ADMIN_USER_ID;

export default function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [project, setProject] = useState<Record<string, unknown> | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function load() {
      if (!supabase) {
        router.push("/login");
        return;
      }
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login?next=/projects/" + params.id + "/edit");
        return;
      }

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error || !data) {
        router.push("/projects");
        return;
      }

      if (data.owner_id !== user.id && user.id !== ADMIN_ID) {
        router.push("/projects/" + params.id);
        return;
      }

      setProject(data);
      setSelectedCategories((data.tags as string[]) || []);
      setSelectedSkills(
        ((data.tags as string[]) || []).filter((t: string) =>
          (SKILL_OPTIONS as readonly string[]).includes(t)
        )
      );
      if (data.image_url) {
        setImagePreview(data.image_url as string);
      }
      setLoading(false);
    }
    load();
  }, [params.id, router]);

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
    if (!supabase || !project) return;
    setSaving(true);

    const form = new FormData(e.currentTarget);

    let imageUrl = (project.image_url as string) || "";

    if (imageFile) {
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

    await supabase
      .from("projects")
      .update({
        title: form.get("title"),
        summary: form.get("summary"),
        description: form.get("description") || "",
        status: form.get("status"),
        tags: [...selectedCategories, ...selectedSkills],
        team_members: ((form.get("team_members") as string) || "")
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean),
        looking_for: ((form.get("looking_for") as string) || "")
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean),
        external_link: form.get("external_link") || "",
        image_url: imageUrl || null,
      })
      .eq("id", params.id);

    setSaving(false);
    router.push("/projects/" + params.id);
    router.refresh();
  }

  if (loading) {
    return (
      <div className="section-padding">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-mist rounded w-1/3" />
            <div className="h-10 bg-mist rounded" />
            <div className="h-10 bg-mist rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight mb-6">Edit project</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Title</label>
            <input
              name="title"
              required
              className="input-field"
              defaultValue={(project?.title as string) || ""}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Summary</label>
            <input
              name="summary"
              required
              className="input-field"
              defaultValue={(project?.summary as string) || ""}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Team Members
            </label>
            <input
              name="team_members"
              placeholder="Comma-separated"
              className="input-field"
              defaultValue={
                ((project?.team_members as string[]) || []).join(", ") || ""
              }
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
              defaultValue={
                ((project?.looking_for as string[]) || []).join(", ") || ""
              }
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
              defaultValue={(project?.description as string) || ""}
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
            <select
              name="status"
              className="input-field"
              defaultValue={(project?.status as string) || "seeking"}
            >
              <option value="seeking">Seeking collaborators</option>
              <option value="building">In progress</option>
              <option value="launched">Launched</option>
            </select>
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
            <label className="block text-sm font-semibold mb-2">Skills</label>
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
                    setSelectedSkills((prev) => [
                      ...prev,
                      customSkill.trim(),
                    ]);
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
              External Link
            </label>
            <input
              name="external_link"
              placeholder="https://github.com/user/repo or https://yoursite.com"
              className="input-field"
              defaultValue={(project?.external_link as string) || ""}
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="bg-ink text-paper font-semibold px-6 py-3 rounded-pill hover:bg-ink/80 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
