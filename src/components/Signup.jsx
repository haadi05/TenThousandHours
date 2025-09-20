import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
//Firebase import
import { useAuth } from "../context/AuthContext";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";

function SignupForm({ className, ...props }) {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    if (!isRegistering) {
      try {
        setIsRegistering(true);
        await doCreateUserWithEmailAndPassword(email, password);
        navigate("/dashboard");
      } catch (error) {
        switch (error.code) {
          case "auth/invalid-email":
            setErrorMessage("Email format is invalid");
            break;
          case "auth/too-many-requests":
            setErrorMessage("Too many failed attempts. Try again later");
            break;
          case "auth/network-request-failed":
            setErrorMessage("Network error. Check your connection");
            break;
          case "auth/weak-password":
            setErrorMessage("Password should be at least 6 characters");
            break;
          default:
            setErrorMessage(error.message);
        }
      } finally {
        setIsRegistering(false);
      }
    }
  };

  const onGoogleSignup = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      try {
        setIsRegistering(true);
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
        setIsRegistering(false);
      }
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/dashboard"} replace />}
      <div className="flex flex-col justify-center items-center h-screen">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card className="w-sm">
            <p className="flex justify-center font-semibold text-2xl ">
              Signup for your account
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
                      disabled={isRegistering}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      disabled={isRegistering}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      type="password"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      disabled={isRegistering}
                      type="submit"
                      className="w-full cursor-pointer"
                    >
                      Signup
                    </Button>
                    <Button
                      disabled={isRegistering}
                      onClick={(e) => onGoogleSignup(e)}
                      variant="outline"
                      className="w-full cursor-pointer"
                    >
                      <img src="./public/googleLogo.svg" className="size-5" />
                      Signup with Google
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?
                  <NavLink
                    to={"/login"}
                    replace
                    className="underline  underline-offset-4"
                  >
                    Log in
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
export default SignupForm;
