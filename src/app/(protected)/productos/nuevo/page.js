'use client';

import { useState } from 'react';
import { API } from '@/config';
import { apiFetch } from '@/lib/api';
import StatusBox from '@/components/StatusBox';
import { useRouter } from 'next/navigation';
import { clearToken } from '@/lib/auth';

export default function NuevoProductoPage() { 
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function validar() {
    if (!nombre.trim()) return 'Nombre requerido';
    const p = Number(precio);
    if (!Number.isFinite(p) || p <= 0) return 'Precio inválido';
    return '';
  }
  
  
  const crear = async (ev) => {
    ev.preventDefault();
    setError('');
    setSuccess('');

    const v = validar();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {

      await apiFetch('/productos', {
        method: 'POST',
        body: JSON.stringify({ nombre: nombre.trim(), precio: Number(precio) })
      });

      setSuccess('Producto creado correctamente');
      setNombre('');
      setPrecio('');
    } catch (error) {
      if (error.status === 403) {
        setError('No autorizado, necesitas rol de admin');
        return;
      }
      if (error.status === 401) {
        clearToken();
        router.replace('/login');
        return;
      }
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className='flex flex-col'>
      <h1>Nuevo Producto</h1>

      <form onSubmit={crear}>
        <div>
          <input
            placeholder='Nombre'
            value={nombre}
            onChange={(e)=>setNombre(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder='Precio'
            value={precio}
            onChange={(e)=>setPrecio(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading} className='cursor-pointer border'>{loading ? 'Creando...' : 'Crear'}</button>
      </form>
      <StatusBox loading={loading} error={error} success={success} />
    </main>
  )
}