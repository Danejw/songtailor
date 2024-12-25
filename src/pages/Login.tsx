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
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#9b87f5]/10 via-white to-[#7E69AB]/10">
      {/* Decorative grid pattern overlay */}
      <div className="absolute inset-0 bg-white/50 grid-pattern -z-10" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white/90 -z-10" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-md mx-auto space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Card className="backdrop-blur-sm bg-white/80 border-[#9b87f5]/20 shadow-lg shadow-[#9b87f5]/5">
            <CardHeader className="space-y-3">
              <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
                Welcome to SongTailor
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Sign in to continue to your account
              </p>
            </CardHeader>
            <CardContent>
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#9b87f5',
                        brandAccent: '#7E69AB',
                      },
                    },
                  },
                  className: {
                    container: 'font-sans',
                    button: 'font-medium',
                    input: 'font-normal',
                    label: 'font-medium text-sm text-gray-600',
                  },
                }}
                theme="light"
                providers={[]}
                localization={{
                  variables: {
                    sign_in: {
                      email_label: 'Email',
                      password_label: 'Password',
                    },
                  },
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