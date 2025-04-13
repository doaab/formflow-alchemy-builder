
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/hooks/useAuthQueries";
import { useToast } from "@/components/ui/use-toast";
import { getCsrfCookie, checkAuthStatus } from "../api/services/authService";
import { toast } from "sonner";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

// Form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const { mutate: login, isPending, error } = useLoginMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  const [statusMessage, setStatusMessage] = useState<string>("");
  
  // Check if we were redirected from another page with a message
  const redirectMessage = location.state?.message;
  const redirectFrom = location.state?.from;
  
  useEffect(() => {
    // Check if user is already logged in
    const checkLoginStatus = async () => {
      try {
        const isAuthenticated = await checkAuthStatus();
        if (isAuthenticated) {
          toast.success("Already Logged In");
          navigate('/forms');
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    
    // Pre-fetch CSRF token when component loads
    const preloadCsrf = async () => {
      try {
        setStatusMessage("Establishing secure connection...");
        await getCsrfCookie();
        setStatusMessage("");
      } catch (error) {
        console.error("Failed to preload CSRF token:", error);
        setStatusMessage("Warning: Could not establish secure connection. Login may fail.");
      }
    };
    
    checkLoginStatus();
    preloadCsrf();
    
    if (redirectMessage) {
      uiToast({
        title: "Authentication Required",
        description: redirectMessage,
      });
    }
  }, [redirectMessage, uiToast, navigate]);
  
  // Form definition
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  // Form submission handler
  function onSubmit(values: LoginFormValues) {
    login({
      email: values.email,
      password: values.password
    }, {
      onSuccess: () => {
        toast.success("Login successful");
        // If there was a redirect path, go back to it after login
        if (redirectFrom) {
          navigate(redirectFrom);
        } else {
          navigate('/forms');
        }
      },
      onError: (error) => {
        toast.error(`Login failed: ${error.message}`);
      }
    });
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login to Your Account</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {statusMessage && (
            <Alert className="mb-4 bg-blue-50">
              <AlertDescription>{statusMessage}</AlertDescription>
            </Alert>
          )}
          
          {redirectMessage && (
            <Alert className="mb-6">
              <AlertDescription>{redirectMessage}</AlertDescription>
            </Alert>
          )}
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="********" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
