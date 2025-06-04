import React from 'react';
import AuthLayout from '@/components/layout/AuthLayout';
import LoginForm from '@/components/Login/LoginForm';
// import { useNavigate } from 'react-router-dom'; // Uncomment if using React Router for navigation

// This interface should align with the Zod schema in LoginForm.tsx
interface LoginFormData {
  username: string;
  password: string;
}

/**
 * LoginPage is the main component for the login screen.
 * It utilizes AuthLayout for centering content and LoginForm for the authentication form.
 */
const LoginPage: React.FC = () => {
  // const navigate = useNavigate(); // Initialize navigate for routing if needed

  /**
   * Handles the login submission.
   * In a real application, this function would make an API call to authenticate the user.
   * @param data - The login form data (username and password).
   * @returns A promise that resolves when the login process is complete, or rejects on error.
   */
  const handleLogin = async (data: LoginFormData): Promise<void> => {
    console.log('Attempting login with:', data);
    // Simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Example logic: Replace with actual authentication call
    if (data.username === 'user' && data.password === 'password') {
      console.log('Login successful for:', data.username);
      alert(`Login successful! Welcome, ${data.username}.`);
      // navigate('/dashboard'); // Example: Redirect to dashboard after successful login
    } else if (data.username === 'test@fail.com') {
      // Example: Simulate a server error that LoginForm can display
      console.error('Simulated server error for:', data.username);
      throw new Error('This is a simulated server error message.');
    } else {
      // Example: Simulate incorrect credentials, also throwing an error
      console.warn('Login failed for:', data.username);
      throw new Error('Incorrect username or password. Please try again.');
    }
  };

  /**
   * Handles the navigation to the sign-up page.
   * In a real application, this would route the user to the registration screen.
   */
  const handleNavigateToSignUp = (): void => {
    console.log('Navigate to Sign Up page action triggered.');
    alert('Navigating to Sign Up page (simulation).');
    // navigate('/signup'); // Example: Navigate to the sign-up page
  };

  return (
    <AuthLayout>
      <LoginForm 
        onLogin={handleLogin}
        onNavigateToSignUp={handleNavigateToSignUp}
        // The LoginForm component applies its own styling, including width (w-[400px]) and background (bg-card).
        // Additional classes can be passed via `className` prop if specific overrides are needed for the Card component within LoginForm.
      />
    </AuthLayout>
  );
};

export default LoginPage;
