
import { useState } from "react";

import { Button } from "../components/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/Card";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { Alert, AlertDescription } from "../components/Alert";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  if (!formData.email || !formData.password) {
    setError("Please fill in all fields");
    setIsLoading(false);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    setError("Please enter a valid email address");
    setIsLoading(false);
    return;
  }

  try {
    const res = await axios.post("http://localhost:4000/api/auth/login", {
      email: formData.email,
      password: formData.password,
    });

    // Save token and user in localStorage
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    console.log("Login successful:", res.data.user);

    // Redirect based on role
    switch (res.data.user.role) {
      case "ADMIN":
        window.location.href = "/admin-dashboard";
        navigate("/admin-dashboard");
        break;
      case "OWNER":
        // window.location.href = "/store-owner-dashboard";
        navigate("/store-owner-dashboard");
        break;
      default:
        // window.location.href = "/user-dashboard";
        navigate("/user-dashboard");

    }
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.message || "Login failed. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Card className="shadow-2xl border border-white/10 bg-black/70 backdrop-blur text-white/80">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
        <CardDescription className="text-gray-400">Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 border-gray-700 focus:border-white focus:ring-white bg-black/60 text-white placeholder:text-gray-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 pr-10 border-gray-700 focus:border-white focus:ring-white bg-black/60 text-white placeholder:text-gray-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2 text-gray-400">
              <input type="checkbox" className="accent-white" />
              Remember me
            </label>
            <NavLink to="#" className="text-gray-300 hover:text-white">Forgot password?</NavLink>
          </div>

          <Button type="submit" className="w-full bg-white hover:bg-gray-200 text-black cursor-pointer" disabled={isLoading}>
            {isLoading ? <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</span> : "Sign In"}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <NavLink to="/signup" className="text-white hover:text-gray-200 font-medium">
            Sign up
          </NavLink>
        </div>
      </CardContent>
    </Card>
  );
}
