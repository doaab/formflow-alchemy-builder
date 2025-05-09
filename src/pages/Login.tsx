
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLogin } from '@/api/hooks/useAuthQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/context/TranslationContext';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const { mutate: login, isLoading } = useLogin();

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">{t('login')}</CardTitle>
            <CardDescription className="text-center">
              {t('enter')} {t('email')} {t('and')} {t('password')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    }
                  })}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    {t('loading')}...
                  </div>
                ) : (
                  t('login')
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-center">
              {t('dontHaveAccount')}?{' '}
              <Link to="/register" className="text-primary hover:underline">
                {t('register')}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
