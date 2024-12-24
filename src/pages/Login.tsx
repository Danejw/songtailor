import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo || "/";
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate(returnTo);
      } else if (event === 'INITIAL_SESSION') {
        if (session) navigate(returnTo);
      } else if (event === 'TOKEN_REFRESHED') {
        // Ignore token refresh events
      } else if (event === 'SIGNED_OUT') {
        setError(null);
      } else if (event === 'PASSWORD_RECOVERY') {
        setError(null);
      } else {
        // Handle potential error events
        if (event.includes('ERROR')) {
          if (error?.includes('Invalid login credentials')) {
            setError("Invalid email or password. Please try again.");
          } else if (error?.includes('Email not confirmed')) {
            setError("Please check your email to confirm your account before signing in.");
          } else {
            setError("An error occurred during authentication.");
          }
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, returnTo, error]);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-100 via-white to-blue-100 grid-pattern -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.8)_100%)] -z-10" />
      <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-md mx-auto space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Card className="backdrop-blur-sm bg-white/80">
            <CardHeader>
              <CardTitle className="text-center">Welcome to SongTailor</CardTitle>
            </CardHeader>
            <CardContent>
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                theme="light"
                providers={[]}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;