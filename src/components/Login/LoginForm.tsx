import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

// Define the form schema using Zod
const loginFormSchema = z.object({
  username: z.string().min(1, { message: 'Username is required.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  className?: string;
  onLogin?: (data: LoginFormData) => Promise<void> | void;
  onNavigateToSignUp?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ className, onLogin, onNavigateToSignUp }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    if (onLogin) {
      try {
        await onLogin(data);
      } catch (error) {
        console.error("Login failed:", error);
        // Example: Display a server error message on the form
        form.setError('root.serverError', { 
          type: 'custom', 
          message: error instanceof Error ? error.message : 'An unexpected error occurred during login.' 
        });
      }
    } else {
      // Default behavior: Simulate API call if no onLogin prop is provided
      console.log('Login data:', data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Example success/error conditions for testing - uncomment to use
      // if (data.username !== 'testuser' || data.password !== 'password') {
      //   form.setError('root.serverError', { type: 'custom', message: 'Invalid username or password.' });
      // } else {
      //   console.log('Simulated login successful');
      // }
    }
    setIsLoading(false);
  };

  const handleSignUpClick = React.useCallback(() => {
    if (onNavigateToSignUp) {
      onNavigateToSignUp();
    } else {
      console.log("Navigate to Sign Up page clicked");
    }
  }, [onNavigateToSignUp]);

  return (
    <Card className={cn('w-[400px] bg-card', className)}> 
      <CardHeader className="p-6">
        <CardTitle className="text-3xl font-bold text-center text-card-foreground">
          Log in
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6"> 
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-card-foreground">Username</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your username" 
                      {...field} 
                      className="bg-card border-border placeholder:text-muted-foreground"
                      disabled={isLoading}
                    />
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
                  <FormLabel className="text-card-foreground">Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Enter your password" 
                      {...field} 
                      className="bg-card border-border placeholder:text-muted-foreground"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors.root?.serverError && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.root.serverError.message}
              </p>
            )}
            <Button 
              type="submit" 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Log in'
              )}
            </Button>
            <Button 
              type="button"
              variant="link" 
              className="w-full text-sm text-primary hover:text-primary/90 font-medium"
              onClick={handleSignUpClick}
              disabled={isLoading}
            >
              or, sign up
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
