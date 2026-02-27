'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API } from '@/config';
import { getToken, setToken } from '@/lib/auth';
import StatusBox from '@/components/StatusBox';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Si ya hay token, redirige a productos
    const token = getToken();
    if (token) {
      router.replace('/productos/nuevo');
    }
    return;
  }, [router]);

  const login = async (ev) => {
    ev.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch(`${API}/users/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json().catch(()=>({}));

    if (!res.ok) {
      setError(data.error || 'Credenciales incorrectas');
      return;
    }
      setToken(data.token);
      setSuccess('Login Correcto');
      router.replace('/productos');
    } catch (err) {
      setError('Error de red / API no disponible');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-4">
      <h1>Login</h1>
      <form onSubmit={login}>
        <Input value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <Input value={password} placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
        <Button type="submit" alt="Entrar" disabled={loading}>{ loading ? 'Entrando...' : 'Entrar' }</Button>
      </form>
      
      <div className='mt-3'>
        <StatusBox loading={loading} error={error} success={success} />
      </div>
    </main>
  );
}