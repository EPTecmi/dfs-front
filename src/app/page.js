import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className='grid gap-6'>
      <div>
        <h1 className='text-3xl font-bold mb-4'>Bienvenido a DFS</h1>
        <p className='text-lg text-slate-700'>Demo Full Stack: productos, login y mas</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Explorar Productos">
          <p>Gestiona tus productos de forma sencilla.</p>
          <Link href="/productos"><Button>Ver Productos</Button></Link>
        </Card>

        <Card title="Administración">
          <p>Accede a funcionalidades administrativas.</p>
          <Link href="/login"><Button variant="secondary">Login</Button></Link>
          <Link href="/productos/nuevo"><Button className="ml-2">Crear Producto</Button></Link>
        </Card>
      </div>
    </div>
  );
}