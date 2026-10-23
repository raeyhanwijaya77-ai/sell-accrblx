import './globals.css';
import { getUser, isAdmin } from '@/lib/auth';
export const metadata = { title: 'Roblox Store — Akun Premium', description: 'Jual akun Roblox, pembayaran QRIS otomatis' };
const WA = process.env.NEXT_PUBLIC_WA_ADMIN, CH = process.env.NEXT_PUBLIC_WA_CHANNEL;
export default async function RootLayout({ children }) {
  const u = await getUser();
  return (
    <html lang="id"><body>
      <nav>
        <a href="/" className="logo">ROBLOX STORE</a>
        <span>
          <a href={CH} target="_blank" className="mut">Saluran WA</a>
          {u && <a href="/riwayat" className="mut">Pesanan</a>}
          {isAdmin(u) && <a href="/admin" className="gold">Admin</a>}
          {u ? <a href="/api/logout" className="mut">Keluar</a> : <a href="/login" className="gold">Masuk</a>}
        </span>
      </nav>
      {children}
      <a className="wa" href={`https://wa.me/${WA}`} target="_blank">💬 Chat Admin</a>
    </body></html>
  );
}
