import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useTranslation } from '@/context/TranslationContext';
import { addLanguageToPath } from '@/i18n/languageUtils';
import loginIllustration from '/public/lovable-uploads/1712dd25-a22d-4a5a-adb1-56f4fa2502f8.png';
import { Separator } from '@/components/ui/separator';

interface LoginFormData {
  email: string;
  password: string;
  phone?: string;
}

const Login: React.FC = () => {
  const { t, currentLanguage, toggleLanguage } = useTranslation();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<LoginFormData>();
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      // Navigation is handled inside the login function in AuthContext
    } catch (error) {
      console.error('Login error in component:', error);
      // Error is already handled in the login function
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const switchToPhoneLogin = () => {
    setLoginMethod('phone');
    setValue('email', '');
  };

  const switchToEmailLogin = () => {
    setLoginMethod('email');
    setValue('phone', '');
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
              {loginMethod === 'phone' && (
                <p className="text-sm text-gray-600">
                  {t('noAccount')}? <Link to={addLanguageToPath('/register', currentLanguage)} className="text-purple-600 hover:text-purple-800 font-medium">{t('register')}</Link>
                </p>
              )}
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {loginMethod === 'email' ? (
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
                      required: loginMethod === 'email' ? 'Email is required' : false,
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base font-medium text-gray-700">
                    {t('phoneNumber')}
                  </Label>
                  <div className="flex">
                    <div className="bg-gray-50 border border-gray-200 rounded-l-md flex items-center px-3 text-gray-500">
                      +966
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      className="h-12 bg-gray-50 border-gray-200 rounded-l-none"
                      placeholder="5xxxxxxxx"
                      {...register('phone', { 
                        required: loginMethod === 'phone' ? 'Phone number is required' : false,
                        pattern: {
                          value: /^[0-9]{9}$/,
                          message: 'Phone number must be 9 digits'
                        }
                      })}
                    />
                  </div>
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                </div>
              )}
              
              {loginMethod === 'email' && (
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
                        required: loginMethod === 'email' ? 'Password is required' : false,
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
              )}
              
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
              
              {loginMethod === 'email' && (
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    {t('dontHaveAccount')}?{' '}
                    <Link to={addLanguageToPath('/register', currentLanguage)} className="text-purple-600 hover:text-purple-800 font-medium">
                      {t('register')}
                    </Link>
                  </p>
                </div>
              )}
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-50 px-2 text-gray-500">{t('or')}</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {loginMethod === 'email' ? (
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full h-12 flex items-center justify-center gap-2"
                    onClick={switchToPhoneLogin}
                  >
                    <span className="text-gray-700">{t('loginWithPhone')}</span>
                  </Button>
                ) : (
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full h-12 flex items-center justify-center gap-2"
                    onClick={switchToEmailLogin}
                  >
                    <span className="text-gray-700">{t('loginWithEmail')}</span>
                  </Button>
                )}

                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full h-12 flex items-center justify-center gap-2 border-gray-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="w-5 h-5">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span>{t('loginWithGoogle')}</span>
                </Button>

                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full h-12 flex items-center justify-center gap-2 border-gray-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                    <path d="M10 2c1 .5 2 2 2 5" />
                  </svg>
                  <span>{t('loginWithApple')}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
