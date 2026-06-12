"use client";

import { useCallback, useEffect, useState } from "react";
import { Project } from "@/types/project";
import { ArrowRight, Loader2, LogOut, Lock, Pencil, Plus, Trash2, X } from "lucide-react";

export default function Admin() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  // Login state
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [metrics, setMetrics] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch {}
    finally {
      setLoading(false);
    }
  }, [setLoading]);

  // On mount, check if a token is already stored
  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = localStorage.getItem("adminToken");
      if (stored) setToken(stored);
      fetchProjects();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchProjects]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const { token: newToken } = await res.json();
        localStorage.setItem("adminToken", newToken);
        setToken(newToken);
        setPassword("");
      } else {
        setLoginError("Incorrect password. Please try again.");
      }
    } catch {
      setLoginError("Login failed. Check your connection.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setTitle(project.title);
    setDescription(project.description);
    setTags(project.tags?.join(", ") || "");
    setExternalLink(project.externalLink || "");
    setMetrics(project.metrics || "");
    setImageUrl(project.imageUrl || "");
    setPdfUrl(project.pdfUrl || "");
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    clearForm();
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setTags("");
    setExternalLink("");
    setMetrics("");
    setImageUrl("");
    setPdfUrl("");
  };

  const handleAddProject = () => {
    setEditingProject(null);
    clearForm();
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      if (editingProject) {
        const res = await fetch("/api/projects", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: editingProject.id,
            title,
            description,
            tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
            externalLink,
            metrics,
            imageUrl,
            pdfUrl,
          }),
        });

        if (res.ok) {
          setSuccessMessage("✅ Project updated! Your site will update in ~60 seconds.");
          setEditingProject(null);
          clearForm();
          fetchProjects();
        } else {
          const err = await res.json();
          setErrorMessage(err.error || "Failed to update project.");
        }
      } else {
        const newProject: Omit<Project, "id" | "createdAt"> = {
          title,
          description,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          externalLink,
          metrics,
          imageUrl,
          pdfUrl,
        };

        const res = await fetch("/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newProject),
        });

        if (res.ok) {
          setSuccessMessage(
            "✅ Project published! Your site will update in ~30–60 seconds as Vercel rebuilds."
          );
          clearForm();
          fetchProjects();
        } else {
          const err = await res.json();
          setErrorMessage(err.error || "Failed to publish project.");
        }
      }
    } catch {
      setErrorMessage("Something went wrong. Check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;

    try {
      const res = await fetch("/api/projects", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setSuccessMessage("✅ Project deleted.");
        fetchProjects();
      }
    } catch {}
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-(--color-accent)" size={32} />
      </div>
    );
  }

  // — LOGIN SCREEN —
  if (!token) {
    return (
      <div className="mx-auto max-w-md px-6 pt-32 pb-12">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-full bg-(--color-cream-dark) border border-(--color-ink)/10 flex items-center justify-center mb-4">
            <Lock size={22} className="text-(--color-accent)" />
          </div>
          <h1 className="font-serif text-4xl">Admin Login</h1>
          <p className="text-sm opacity-60 mt-2">Portfolio dashboard — restricted access</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-(--color-cream-dark) p-8 rounded-2xl border border-(--color-ink)/10 flex flex-col gap-4"
        >
          {loginError && (
            <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{loginError}</p>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              autoFocus
              className="w-full px-4 py-2 rounded-lg border border-(--color-ink)/20 bg-(--color-cream) text-(--color-ink) focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loggingIn}
            className="mt-2 bg-(--color-dark) text-(--color-cream) px-6 py-3 rounded-xl font-medium hover:bg-(--color-ink) transition disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loggingIn ? <Loader2 className="animate-spin" size={18} /> : null}
            {loggingIn ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    );
  }

  // — DASHBOARD —
  return (
    <div className="mx-auto max-w-4xl px-6 pt-16 pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="font-serif text-4xl">Dashboard</h1>
          <p className="text-sm opacity-60 mt-1">Manage your projects</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddProject}
            className="flex items-center gap-2 bg-(--color-accent) text-(--color-cream) px-4 py-2 rounded-xl text-sm font-medium hover:bg-(--color-accent-dark) transition"
          >
            <Plus size={16} /> Add Project
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-(--color-ink)/70 hover:text-(--color-ink) transition px-3 py-2"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Projects List */}
      {projects.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-serif mb-4">Existing Projects</h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 bg-(--color-cream-dark) rounded-lg border border-(--color-ink)/10">
                <span className="font-medium">{project.title}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 text-(--color-accent) hover:bg-(--color-accent)/10 rounded"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id!, project.title)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-(--color-cream-dark) p-8 rounded-2xl border border-(--color-ink)/10">
        <h2 className="text-2xl font-serif mb-2 border-b border-(--color-ink)/10 pb-4 flex items-center justify-between">
          {editingProject ? "Edit Project" : "Add New Project"}
          {editingProject && (
            <button
              onClick={handleCancelEdit}
              className="p-1 text-(--color-ink)/50 hover:text-(--color-ink)"
            >
              <X size={18} />
            </button>
          )}
        </h2>
        <p className="text-xs opacity-60 mb-6">
          Requires a GitHub token with <strong>Contents: Read and write</strong> on this repo
          (not Actions or Deployments). Set <code className="text-[11px]">GITHUB_TOKEN</code> in Vercel.
        </p>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200 text-sm">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg border border-red-200 text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">Project Title *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded-lg border border-(--color-ink)/20 bg-(--color-cream) focus:ring-2 focus:ring-(--color-accent) focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              required
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-(--color-ink)/20 bg-(--color-cream) focus:ring-2 focus:ring-(--color-accent) focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. AI, B2B, Growth"
                className="w-full px-4 py-2 rounded-lg border border-(--color-ink)/20 bg-(--color-cream) focus:ring-2 focus:ring-(--color-accent) focus:outline-none"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Key Metric</label>
              <input
                type="text"
                placeholder="e.g. +40% retention, $4M ARR"
                className="w-full px-4 py-2 rounded-lg border border-(--color-ink)/20 bg-(--color-cream) focus:ring-2 focus:ring-(--color-accent) focus:outline-none"
                value={metrics}
                onChange={(e) => setMetrics(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Prototype / External Link
            </label>
            <input
              type="url"
              placeholder="https://..."
              className="w-full px-4 py-2 rounded-lg border border-(--color-ink)/20 bg-(--color-cream) focus:ring-2 focus:ring-(--color-accent) focus:outline-none"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1">Project Image Path</label>
              <input
                type="text"
                placeholder="/project-cover.png"
                className="w-full px-4 py-2 rounded-lg border border-(--color-ink)/20 bg-(--color-cream) focus:ring-2 focus:ring-(--color-accent) focus:outline-none"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <p className="text-xs opacity-50 mt-1">
                Drop the image into the <code>public/</code> folder and push to GitHub first.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Document Link (Google Drive)</label>
              <input
                type="url"
                placeholder="https://drive.google.com/..."
                className="w-full px-4 py-2 rounded-lg border border-(--color-ink)/20 bg-(--color-cream) focus:ring-2 focus:ring-(--color-accent) focus:outline-none"
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
              />
              <p className="text-xs opacity-50 mt-1">
                Share the file as &quot;Anyone with the link can view&quot; in Google Drive.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 inline-flex items-center justify-center gap-2 bg-(--color-accent) text-(--color-cream) px-6 py-3 rounded-xl font-medium hover:bg-(--color-accent-dark) transition disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={18} /> Saving...
              </>
            ) : (
              <>
                <ArrowRight size={18} /> {editingProject ? "Update Project" : "Publish Project"}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}