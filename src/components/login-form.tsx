"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";

import supabase from "@/db/api/client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const router = useRouter();

  const checkRegisteredUser = async (email: string) => {
    const {data, error} = await supabase.from("users").select("email").eq("email", email);

    if (error) {
      return false;
    } else {
      return data.length > 0;
    }
  };

  const handleSignup = async () => {
    setLoadingSignUp(true);
    setError(null);

    try {
      const isRegistered = await checkRegisteredUser(email);

      if (isRegistered) {
        setError("User already registered");
      } else {
        const {error, data} = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          setError("Error signing up");
        } else {
          const {
            user: {id, email: userEmail},
          } = data;
          const {error} = await supabase.from("users").insert({id: id, email: userEmail});

          alert("Check your email for the confirmation link!");
        }
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoadingSignUp(false);
    }
  };

  const handleLogin = async () => {
    setLoadingLogin(true);
    setError(null);

    try {
      const {error, data} = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      alert("Logged in successfully!");
      router.push("/dashboard");

      // Redirigir al dashboard o página protegida
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoadingLogin(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Login or Sign Up</CardTitle>
        <CardDescription>
          Enter your email below to login or sign up to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              required
              id="email"
              placeholder="m@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {/* <Link className="ml-auto inline-block text-sm underline" href="#">
                Forgot your password?
              </Link> */}
            </div>
            <Input
              required
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="error">{error}</p>}
          <Button
            className="w-full"
            disabled={loadingLogin || loadingSignUp}
            type="submit"
            onClick={handleLogin}
          >
            {loadingLogin ? "Logging in..." : "Login"}
          </Button>
          <Button
            className="w-full"
            disabled={loadingLogin || loadingSignUp}
            variant="secondary"
            onClick={handleSignup}
          >
            {loadingSignUp ? "Signing up..." : "Sign Up"}
          </Button>
          {/* <Button className="w-full" variant="outline">
            Login with Google
          </Button> */}
        </div>
        {/* <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link className="underline" href="#">
            Sign up
          </Link>
        </div> */}
      </CardContent>
    </Card>
  );
}
