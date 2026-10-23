import Link from 'next/link';
import { sql, init } from '@/lib/db';
export const dynamic = 'force-dynamic';
export default async function Home() {
  await init();
  const rows = await sql`select id,title,price,images from accounts where status='available' or (status='reserved' and reserved_at<now()-interval '15 minutes') order by id desc`;
  return (
    <div className="w">
      <div className="hero">
        <h1>Akun Roblox <span className="gold">Premium</span></h1>
        <p className="mut">Bayar QRIS · Akun langsung dikirim otomatis · Dibantu admin</p>
      </div>
      {!rows.length && <p className="mut" style={{ textAlign: 'center' }}>Stok sedang kosong, cek lagi nanti.</p>}
      <div className="grid">
        {rows.map((a) => (
          <Link key={a.id} href={`/akun/${a.id}`} className="card">
            <img src={a.images?.[0] || ''} alt="" />
            <div><b>{a.title}</b><p className="price">Rp {a.price.toLocaleString('id-ID')}</p></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
