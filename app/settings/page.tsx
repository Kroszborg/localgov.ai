"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        setError("Could not fetch user profile.");
        setLoading(false);
        return;
      }
      setEmail(user.email || "");
      setName(user.user_metadata?.name || "");
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess("");
    setError("");
    // Update user metadata (name)
    const { error: updateError } = await supabase.auth.updateUser({
      data: { name },
    });
    if (updateError) {
      setError("Failed to update profile.");
    } else {
      setSuccess("Profile updated successfully.");
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    setError("");
    setSuccess("");
    setShowDelete(false);
    try {
      // Get the current session and access token
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const accessToken = session?.access_token;
      if (!accessToken) {
        setError("Not authenticated.");
        return;
      }
      const res = await fetch("/api/delete-account", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.ok) {
        await supabase.auth.signOut();
        router.push("/");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to delete account.");
      }
    } catch (err) {
      setError("Failed to delete account.");
    }
  };

  return (
    <div className="container mx-auto py-16 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="space-y-12">
        {/* Profile Section */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p className="text-muted-foreground mb-4">
            Update your profile information.
          </p>
          <form
            onSubmit={handleSave}
            className="space-y-4 bg-muted/30 p-6 rounded-lg"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading || saving}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full border rounded px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                value={email}
                disabled
                placeholder="you@email.com"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold"
              disabled={loading || saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            {success && (
              <div className="text-green-600 font-medium pt-2">{success}</div>
            )}
            {error && (
              <div className="text-red-600 font-medium pt-2">{error}</div>
            )}
          </form>
        </section>
        {/* Account Section */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Account</h2>
          <p className="text-muted-foreground mb-4">
            Manage your account settings.
          </p>
          <div className="bg-muted/30 p-6 rounded-lg flex flex-col gap-4">
            <Button
              variant="destructive"
              onClick={() => setShowDelete(true)}
              className="w-full"
              disabled={loading}
            >
              Delete Account
            </Button>
            {showDelete && (
              <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg mt-2">
                <p className="mb-2 text-red-700 dark:text-red-300 font-semibold">
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    onClick={() => setShowDelete(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="outline" onClick={handleDelete}>
                    Confirm
                  </Button>
                </div>
              </div>
            )}
            {success && !showDelete && (
              <div className="text-green-600 font-medium pt-2">{success}</div>
            )}
            {error && !showDelete && (
              <div className="text-red-600 font-medium pt-2">{error}</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
