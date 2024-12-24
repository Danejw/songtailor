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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate(returnTo);
      } else if (event === 'INITIAL_SESSION') {
        if (session) navigate(returnTo);
      } else if (event === 'SIGNED_OUT' || event === 'PASSWORD_RECOVERY') {
        setError(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, returnTo]);

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
                onError={(error) => {
                  if (error.message.includes('email_not_confirmed')) {
                    setError("Please check your email and click the confirmation link before signing in.");
                  } else if (error.message.includes('Invalid login credentials')) {
                    setError("Invalid email or password. Please try again.");
                  } else {
                    setError("An error occurred during authentication. Please try again.");
                  }
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;