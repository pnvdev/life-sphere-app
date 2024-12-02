"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";

import {Database} from "@/db/types";
import supabase from "@/db/api/client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const [loadingSignUp, setLoadingSignUp] = useState<boolean>(false);
  const router = useRouter();

  const checkRegisteredUser = async (email: string): Promise<boolean> => {
    try {
      const {data, error} = await supabase
        .from<"users", Database["public"]["Tables"]["users"]["Row"]>("users")
        .select("email")
        .eq("email", email);

      if (error) {
        return false;
      }

      return data && data.length > 0;
    } catch {
      return false;
    }
  };

  const handleSignup = async (): Promise<void> => {
    setLoadingSignUp(true);
    setError(null);

    try {
      const isRegistered = await checkRegisteredUser(email);

      if (isRegistered) {
        setError("User already registered");
      } else {
        const {error: signUpError, data} = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          setError("Error signing up");
        } else if (data?.user) {
          const {id, email: userEmail} = data.user;

          const user: Database["public"]["Tables"]["users"]["Insert"] = {
            id: id,
            email: userEmail || "",
            name: "",
          };

          // Insert the user
          const {error: insertError} = await supabase.from("users").insert([user]);

          if (insertError) {
            setError("Error saving user to database");
          } else {
            alert("Check your email for the confirmation link!");
          }
        }
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoadingSignUp(false);
    }
  };

  const handleLogin = async (): Promise<void> => {
    setLoadingLogin(true);
    setError(null);

    try {
      const {data, error: loginError} = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        setError("Invalid credentials. Please try again.");
      } else if (data?.user) {
        alert(`Logged in successfully! Welcome, ${data.user.email}`);
        router.push("/dashboard");
      }
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
            <Label htmlFor="password">Password</Label>
            <Input
              required
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="error text-red-500">{error}</p>}
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
        </div>
      </CardContent>
    </Card>
  );
}
