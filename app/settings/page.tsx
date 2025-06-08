"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Save,
  Trash2,
  Shield,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Settings as SettingsIcon,
  Crown,
} from "lucide-react";

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            <p className="text-muted-foreground">Loading settings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Section */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <SettingsIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">
                  Manage your account preferences and security
                </p>
              </div>
            </div>
            <Badge variant="outline" className="w-fit">
              <Crown className="w-3 h-3 mr-1" />
              Free Plan
            </Badge>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <Card className="border-primary/10">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal information and display preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleSave} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="name"
                            className="flex items-center gap-2"
                          >
                            <User className="w-4 h-4" />
                            Display Name
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading || saving}
                            className="h-11"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="flex items-center gap-2"
                          >
                            <Mail className="w-4 h-4" />
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            disabled
                            className="h-11 bg-muted/50"
                          />
                          <p className="text-xs text-muted-foreground">
                            Email changes require account verification
                          </p>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={loading || saving}
                        className="w-full sm:w-auto min-w-[140px]"
                        size="lg"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>

                      {success && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800 dark:text-green-200">
                              {success}
                            </AlertDescription>
                          </Alert>
                        </motion.div>
                      )}

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        </motion.div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Danger Zone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Card className="border-destructive/20">
                  <CardHeader className="bg-gradient-to-r from-destructive/5 to-destructive/10">
                    <CardTitle className="flex items-center gap-2 text-destructive">
                      <Shield className="w-5 h-5" />
                      Danger Zone
                    </CardTitle>
                    <CardDescription>
                      Irreversible and destructive actions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                        <h3 className="font-semibold text-destructive mb-2">
                          Delete Account
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Once you delete your account, there is no going back.
                          Please be certain. All your data will be permanently
                          deleted.
                        </p>

                        {!showDelete ? (
                          <Button
                            variant="destructive"
                            onClick={() => setShowDelete(true)}
                            className="w-full sm:w-auto"
                            disabled={loading}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Account
                          </Button>
                        ) : (
                          <motion.div
                            className="space-y-4 p-4 bg-background border border-destructive/30 rounded-lg"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-semibold text-destructive">
                                  Are you absolutely sure?
                                </h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  This action cannot be undone. This will
                                  permanently delete your account and remove all
                                  your data from our servers.
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                              <Button
                                variant="outline"
                                onClick={() => setShowDelete(false)}
                                className="flex-1 sm:flex-none"
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={handleDelete}
                                className="flex-1 sm:flex-none"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Yes, delete my account
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => router.push("/dashboard")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Go to Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => router.push("/privacy")}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Privacy Policy
                  </Button>
                </CardContent>
              </Card>

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
