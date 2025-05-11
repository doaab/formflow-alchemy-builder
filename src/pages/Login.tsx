
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '@/api/hooks/useAuthQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useTranslation } from '@/context/TranslationContext';
import loginIllustration from '/public/lovable-uploads/1712dd25-a22d-4a5a-adb1-56f4fa2502f8.png';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { t, currentLanguage, toggleLanguage } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const { mutate: login, isPending: isLoading } = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side - Illustration (hidden on small screens) */}
      <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center p-8">
        <div className="max-w-md">
          <img 
            src={loginIllustration} 
            alt="Form Builder Illustration" 
            className="w-full h-auto"
          />
        </div>
      </div>
      
      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Language switcher */}
        <div className={`flex justify-end p-4 ${currentLanguage === 'ar' ? 'justify-start' : 'justify-end'}`}>
          <button 
            onClick={toggleLanguage}
            className="px-4 py-1 text-purple-700 hover:text-purple-900 transition-colors font-medium"
          >
            {currentLanguage === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
        
        {/* Form container */}
        <div className="flex-grow flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('login')}</h1>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium text-gray-700">
                  {t('email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="h-12 bg-gray-50 border-gray-200"
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-base font-medium text-gray-700">
                    {t('password')}
                  </Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="h-12 bg-gray-50 border-gray-200 pr-10"
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters'
                      }
                    })}
                  />
                  <button 
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    onClick={togglePasswordVisibility}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 text-base bg-purple-600 hover:bg-purple-700" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    {t('loading')}...
                  </div>
                ) : (
                  t('login')
                )}
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {t('dontHaveAccount')}?{' '}
                  <Link to="/register" className="text-purple-600 hover:text-purple-800 font-medium">
                    {t('register')}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
