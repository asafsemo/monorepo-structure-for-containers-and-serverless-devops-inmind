import { useTranslation } from 'react-i18next'
import { useAtomValue } from 'jotai'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import type { LoginFormProps } from '../types'
import { authLogin, $loadingAtom, $errorAtom } from '../services'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

type LoginFormData = z.infer<typeof loginSchema>


export const LoginForm = (props: LoginFormProps) => {
  const { redirectTo } = props
  const { t } = useTranslation()
  const navigate = useNavigate()
  
  const loading = useAtomValue($loadingAtom)
  const error = useAtomValue($errorAtom)
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })
  
  const onSubmit = async (data: LoginFormData) => {
    try {
      await authLogin(data)
      let to = '/';
      if (redirectTo) {
        to= redirectTo
      }
      navigate({ to })
    } catch (error) {
      // Error is handled by the atom
    }
  }
  
  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center mb-2">
          {t('features.authentication.loginForm.title')}
        </CardTitle>
        <p className="text-center text-muted-foreground mb-4">
          {t('features.authentication.loginForm.subtitle')}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              {t('features.authentication.loginForm.emailLabel')}
            </label>
            <Input
              {...register('email')}
              type="email"
              autoComplete="email"
              placeholder={t('features.authentication.loginForm.emailPlaceholder')}
              required
              aria-required="true"
              className="w-full"
              data-testid="email-input"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              {t('features.authentication.loginForm.passwordLabel')}
            </label>
            <Input
              {...register('password')}
              type="password"
              autoComplete="current-password"
              placeholder={t('features.authentication.loginForm.passwordPlaceholder')}
              required
              aria-required="true"
              className="w-full"
              data-testid="password-input"
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <Button 
            disabled={loading} 
            type="submit" 
            className="w-full mt-2"
            data-testid="submit-button"
          >
            {loading ? t('common.messages.loading') : t('features.authentication.loginForm.submitButton')}
          </Button>
        </form>
        <Separator className="my-6" />
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {t('features.authentication.loginForm.or')}
          </span>
          <div className="flex gap-2 w-full justify-center">
            <Button 
              variant="outline" 
              aria-label="Sign in with Facebook" 
              className="w-1/3"
              data-testid="facebook-login"
            >
              <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0" />
              </svg>
            </Button>
            <Button 
              variant="outline" 
              aria-label="Sign in with Google" 
              className="w-1/3"
              data-testid="google-login"
            >
              <svg className="w-5 h-5 mx-auto" viewBox="0 0 48 48">
                <g>
                  <path
                    fill="#4285F4"
                    d="M24 9.5c3.54 0 6.36 1.53 7.82 2.81l5.75-5.75C34.64 3.64 29.82 1.5 24 1.5 14.82 1.5 6.87 7.98 3.69 16.36l6.68 5.19C12.2 15.09 17.61 9.5 24 9.5z"
                  />
                  <path
                    fill="#34A853"
                    d="M46.1 24.5c0-1.64-.15-3.22-.43-4.74H24v9.24h12.4c-.54 2.9-2.18 5.36-4.64 7.04l7.18 5.59C43.98 37.36 46.1 31.36 46.1 24.5z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.37 28.09c-1.09-3.19-1.09-6.6 0-9.79l-6.68-5.19C.99 17.36 0 20.57 0 24s.99 6.64 2.69 9.89l6.68-5.19z"
                  />
                  <path
                    fill="#EA4335"
                    d="M24 46.5c6.48 0 11.93-2.14 15.9-5.81l-7.18-5.59c-2.01 1.35-4.59 2.15-8.72 2.15-6.39 0-11.8-5.59-13.63-12.86l-6.68 5.19C6.87 40.02 14.82 46.5 24 46.5z"
                  />
                </g>
              </svg>
            </Button>
            <Button 
              variant="outline" 
              aria-label="Sign in with Apple" 
              className="w-1/3"
              data-testid="apple-login"
            >
              <svg className="w-5 h-5 mx-auto" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M16.365 1.43c0 1.14-.93 2.07-2.07 2.07-.02 0-.04 0-.06-.01-.02-.01-.04-.01-.06-.01-.02 0-.04 0-.06.01-.02.01-.04.01-.06.01-1.14 0-2.07-.93-2.07-2.07 0-1.14.93-2.07 2.07-2.07.02 0 .04 0 .06.01.02.01.04.01.06.01.02 0 .04 0 .06-.01.02-.01.04-.01.06-.01 1.14 0 2.07.93 2.07 2.07zM21.5 16.5c-.13 2.5-2.13 5.5-4.5 5.5-1.13 0-1.5-.75-3-.75s-1.88.75-3 .75c-2.37 0-4.37-3-4.5-5.5-.13-2.5 1.5-3.5 3-3.5 1.13 0 1.5.75 3 .75s1.88-.75 3-.75c1.5 0 3.13 1 3 3.5z"
                />
              </svg>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <span className="text-sm text-muted-foreground">
          {t('features.authentication.loginForm.noAccount')}
          <a href="/signup" className="text-blue-600 hover:underline ml-1">
            {t('features.authentication.loginForm.signupLink')}
          </a>
        </span>
      </CardFooter>
    </Card>
  )
} 