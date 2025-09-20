import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
// Firebase Imports
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../context/AuthContext";

function LoginForm({ className, ...props }) {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    if (!isSigningIn) {
      try {
        setIsSigningIn(true);
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/invalid-email":
            setErrorMessage("Email format is invalid");
            break;
          case "auth/invalid-credential":
            setErrorMessage("Invalid credentials");
            break;
          case "auth/user-not-found":
            setErrorMessage("No account with that email found");
            break;
          case "auth/wrong-password":
            setErrorMessage("Incorrect password");
            break;
          default:
            setErrorMessage(error.message);
        }
      } finally {
        setIsSigningIn(false);
      }
    }
  };
  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      try {
        setIsSigningIn(true);
        await doSignInWithGoogle();
      } catch (error) {
        switch (error.code) {
          case "auth/popup-closed-by-user":
            setErrorMessage("Sign-in was canceled");
            break;
          case "auth/cancelled-popup-request":
            setErrorMessage("Another sign-in attempt is in progress");
            break;
          case "auth/popup-blocked":
            setErrorMessage(
              "Popup blocked by the browser. Please allow popups and try again"
            );
            break;
          case "auth/account-exists-with-different-credential":
            setErrorMessage("This email is already in use");
            break;
          case "auth/network-request-failed":
            setErrorMessage("Network error. Please check your connection");
            break;
          default:
            setErrorMessage(error.message);
        }
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        {userLoggedIn && <Navigate to={"/dashboard"} replace />}
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card className="w-sm max-[416px]:w-xs">
            <p className="flex justify-center font-semibold text-2xl ">
              Login to your account
            </p>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <div className="flex justify-between">
                      <Label htmlFor="email">Email</Label>
                      <div className="p-1 text-sm font-medium text-red-500">
                        {errorMessage}
                      </div>
                    </div>
                    <Input
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      id="password"
                      type="password"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      disabled={isSigningIn}
                      type="submit"
                      className="w-full cursor-pointer"
                    >
                      Login
                    </Button>
                    <Button
                      disabled={isSigningIn}
                      onClick={(e) => onGoogleSignIn(e)}
                      variant="outline"
                      className="w-full cursor-pointer"
                    >
                      <img src="/googleLogo.svg" className="size-5" />
                      Continue with Google
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <NavLink
                    to={"/signup"}
                    // This replaces the path with /signup
                    replace
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </NavLink>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
