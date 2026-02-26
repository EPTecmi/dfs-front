'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API } from '@/config';
import { setToken } from '@/lib/auth';
import StatusBox from '@/components/StatusBox';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
        <input value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button type='submit' className='border cursor-pointer'>{ loading ? 'Entrando...' : 'Entrar' }</button>
      </form>
      
      <div className='mt-3'>
        <StatusBox loading={loading} error={error} success={success} />
      </div>
    </main>
  );
}