'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUserAction, createUserAction } from '@/actions/user';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LogIn, UserPlus } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
      router.replace('/task');
    }
  }, [router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const action = isRegister ? createUserAction : loginUserAction;
    const result = await action(formData);

    if ('message' in result && result.message) {
      setMessage(result.message);
      setLoading(false);
      return;
    }

    if ('success' in result && result.success === true && result.userId) {
      localStorage.setItem('userId', result.userId);
      localStorage.setItem('loggedIn', 'true');
      router.replace('/task');
    } else {
      setMessage('Erro inesperado');
    }
    setLoading(false);
  }

  return (
    <main className="w-full min-h-screen flex justify-center items-center bg-background">
      <Card className="w-[80vw] max-w-2xl min-h-[400px]  shadow-lg border">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center mb-2">
            {isRegister ? 'Crie sua conta' : 'Faca login'}
          </h1>
          <p className="text-sm text-center text-muted-foreground">
            {isRegister
              ? 'Digite um nome e senha para se cadastrar'
              : 'Entre com seu nome e senha'}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Separator />

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nome
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Seu nome"
                maxLength={12}
                required
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium">
                Senha
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                maxLength={12}
                required
                disabled={loading}
              />
            </div>

            {message && <p className="text-sm text-destructive">{message}</p>}

            <Button
              type="submit"
              className="mt-2 flex items-center gap-2 justify-center"
              disabled={loading}
            >
              {isRegister ? <UserPlus size={18} /> : <LogIn size={18} />}
              {loading ? 'Carregando...' : isRegister ? 'Cadastrar' : 'Entrar'}
            </Button>
          </form>

          <Button
            variant="link"
            className="text-xs text-center mt-2"
            onClick={() => {
              setIsRegister(!isRegister);
              setMessage(null);
            }}
            disabled={loading}
          >
            {isRegister
              ? 'Ja tem uma conta? Faca login'
              : 'Nao tem uma conta? Cadastre-se'}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
