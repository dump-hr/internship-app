import { JwtResponse } from '@internship-app/types/src/auth';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'wouter';

import { api } from '../../api';
import { Path } from '../../constants/paths';

const LoginForm = () => {
  const [, navigate] = useLocation();

  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValid(validateEmail(newEmail));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) {
      console.log('Invalid email: ', email);

      return;
    }

    console.log('Valid email: ', email);

    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };

    await toast.promise(
      api.post<never, JwtResponse>('/auth/login', {
        email: formElements.email.value,
        password: formElements.password.value,
      }),
      {
        loading: 'Logging in...',
        success: ({ access_token }) => {
          localStorage.setItem('access_token', access_token);

          navigate(Path.Home, { replace: true });

          return 'Logged in successfully!';
        },
        error: (error) => error,
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" alignItems="center" gap="20px">
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          error={!isValid}
          helperText={!isValid ? 'Please enter valid email' : ''}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
