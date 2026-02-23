'use client'
import { useEffect, useState } from 'react'
import { API } from '@/config';

export default function PrivadoPage() {
  const [data, setData] = useState({})

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API}/privado`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const result = await res.json();
      setData(result)
    })();
    
  }, [])

  return (
    <main className="p-4">
      <pre>{data}</pre>
    </main>
  );
}

