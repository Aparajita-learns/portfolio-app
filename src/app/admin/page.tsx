"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { addProject } from "@/lib/firebaseUtils";
import { Project } from "@/types/project";
import { ArrowRight, LogOut, Loader2 } from "lucide-react";

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [metrics, setMetrics] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoginError("");
    } catch (error: any) {
      setLoginError(error.message || "Failed to log in");
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    
    setIsSubmitting(true);
    setSuccessMessage("");
    
    try {
      const newProject: Omit<Project, 'id' | 'createdAt'> = {
        title,
        description,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        externalLink,
        metrics,
        imageUrl,
        pdfUrl
      };

      await addProject(newProject);
      
      setSuccessMessage("Project successfully added!");
      // Reset form
      setTitle("");
      setDescription("");
      setTags("");
      setExternalLink("");
      setMetrics("");
      setImageUrl("");
      setPdfUrl("");
    } catch (error) {
      console.error("Error submitting project:", error);
      alert("Failed to add project. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-(--color-accent)" size={32} /></div>;
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-6 pt-32 pb-12">
        <h1 className="font-serif text-4xl mb-8 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="bg-(--color-cream-dark) p-8 rounded-2xl border border-(--color-ink)/10 flex flex-col gap-4">
          {loginError && <p className="text-red-600 text-sm">{loginError}</p>}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              required 
              className="w-full px-4 py-2 rounded-lg border border-(--color-ink)/20 bg-(--color-cream) text-(--color-ink) focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              required 
              className="w-full px-4 py-2 rounded-lg border border-(--color-ink)/20 bg-(--color-cream) text-(--color-ink) focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="mt-4 bg-(--color-dark) text-(--color-cream) px-6 py-3 rounded-xl font-medium hover:bg-(--color-ink) transition">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 pt-16 pb-24">
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-serif text-4xl">Dashboard</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-(--color-ink)/70 hover:text-(--color-ink) transition">
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="bg-(--color-cream-dark) p-8 rounded-2xl border border-(--color-ink)/10">
        <h2 className="text-2xl font-serif mb-6 border-b border-(--color-ink)/10 pb-4">Add New Project</h2>
        
        {successMessage && (
          <div className="mb-6 p-4 bg-(--color-success)/20 text-(--color-dark) rounded-lg border border-(--color-success)/30">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleAddProject} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">Project Title *</label>
            <input 
              type="text" required 
              className="w-full px-4 py-2 rounded-lg border border-(--color-ink)/20 bg-(--color-cream) focus:ring-2 focus:ring-(--color-accent) focus:outline-none"
              value={title} onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea 
              required rows={4}
              className="w-full px-4 py-2 rounded-lg border border-(--color-ink)/20 bg-(--color-cream) focus:ring-2 focus:ring-(--color-accent) focus:outline-none"
              value={description} onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
              <input 
                type="text" placeholder="e.g. AI, RAG, Consumer"
                className="w-full px-4 py-2 rounded-lg border border-(--color-ink)/20 bg-(--color-cream) focus:ring-2 focus:ring-(--color-accent) focus:outline-none"
                value={tags} onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Key Metrics</label>
              <input 
                type="text" placeholder="e.g. 91 percent, $4M ARR"
                className="w-full px-4 py-2 rounded-lg border border-(--color-ink)/20 bg-(--color-cream) focus:ring-2 focus:ring-(--color-accent) focus:outline-none"
                value={metrics} onChange={(e) => setMetrics(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">External Link (Prototype/Live Site)</label>
            <input 
              type="url" placeholder="https://..."
              className="w-full px-4 py-2 rounded-lg border border-(--color-ink)/20 bg-(--color-cream) focus:ring-2 focus:ring-(--color-accent) focus:outline-none"
              value={externalLink} onChange={(e) => setExternalLink(e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-2">
            <div>
              <label className="block text-sm font-medium mb-1">Project Image Path (Local)</label>
              <input 
                type="text" placeholder="/project-1.png"
                className="w-full px-4 py-2 rounded-lg border border-(--color-ink)/20 bg-(--color-cream) focus:ring-2 focus:ring-(--color-accent) focus:outline-none"
                value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
              />
              <p className="text-xs opacity-60 mt-1">Place the image in the public folder.</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">PRD / Document Link (Google Drive)</label>
              <input 
                type="url" placeholder="https://drive.google.com/..."
                className="w-full px-4 py-2 rounded-lg border border-(--color-ink)/20 bg-(--color-cream) focus:ring-2 focus:ring-(--color-accent) focus:outline-none"
                value={pdfUrl} onChange={(e) => setPdfUrl(e.target.value)}
              />
              <p className="text-xs opacity-60 mt-1">Paste the public Google Drive link.</p>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="mt-6 inline-flex items-center justify-center gap-2 bg-(--color-accent) text-(--color-cream) px-6 py-3 rounded-xl font-medium hover:bg-(--color-accent-dark) transition disabled:opacity-70"
          >
            {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> Publishing...</> : <><ArrowRight size={18} /> Publish Project</>}
          </button>
        </form>
      </div>
    </div>
  );
}

