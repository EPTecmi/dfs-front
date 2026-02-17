export async function getProductos() {
  const res = await fetch('http://localhost:3000/productos');
  if (!res.ok) {
    throw new Error('Error al cargar productos');
  }

  return res.json();
}