import { notFound } from 'next/navigation';
import { sql, init } from '@/lib/db';
import Buy from './buy';
export const dynamic = 'force-dynamic';
export default async function Detail({ params }) {
  const { id } = await params;
  await init();
  const [a] = await sql`select id,title,description,price,images,status from accounts where id=${id}`;
  if (!a) notFound();
  return (
    <div className="w">
      <h1>{a.title}</h1>
      <p className="price" style={{ fontSize: 26 }}>Rp {a.price.toLocaleString('id-ID')}</p>
      <div className="gal">{(a.images || []).map((s) => <img key={s} src={s} alt="" />)}</div>
      <p className="mut" style={{ whiteSpace: 'pre-wrap', marginBottom: 20 }}>{a.description}</p>
      {a.status === 'sold' ? <b className="err">Sudah terjual</b> : <Buy id={a.id} />}
    </div>
  );
}
