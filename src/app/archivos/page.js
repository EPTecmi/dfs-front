'use client'

import { useState } from 'react';

export default function ArchivosPage() { 
  const [file, setFile] = useState(null);
  const [path, setPath] = useState('');
  const [signedUrl, setSignedUrl] = useState('');
  const [msg, setMsg] = useState('');

  async function handleUpload(e) {
    e.preventDefault();

    if (!file) return setMsg('Selecciona un archivo');
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', '10');
    formData.append('folder', 'imagenes');

    const res = await fetch('http://localhost:3000/files/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) return setMsg(data.message || 'Error al subir el archivo');
    setPath(data.path);
    setMsg('Archivo subido exitosamente');
  }

  async function handleSignedUrl() { 
    const res = await fetch(`http://localhost:3000/files/signed-url?path=${encodeURIComponent(path)}&expiresIn=20`);

    const data = await res.json().catch(() => ({}));

    if (!res.ok) return setMsg(data.message || 'Error al obtener la URL firmada');

    setSignedUrl(data.url);
    setMsg('URL firmada obtenida exitosamente');
  }

  return (
    <div className='p-2'>
      <h2 className='text-2xl'>Storage Demo</h2>
      <form onSubmit={handleUpload} className='border p-2 my-2'>
        <input className='border ' type="file" onChange={e => setFile(e.target.files[0])} />
        <button className='rounded-md' type="submit">Subir Archivo</button>
      </form>

      {msg && <p>{msg}</p>}
      {path && <p><b>Path:</b> {path}</p>}
      <button className='border rounded-md' onClick={handleSignedUrl} disabled={!path}>Obtener URL Firmada</button>
      {signedUrl && <p><b>URL Firmada:</b> <a href={signedUrl} target="_blank" rel="noopener noreferrer">{signedUrl}</a></p>}
    </div>
  )

}