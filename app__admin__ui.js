'use client';
import { useEffect, useState } from 'react';
const empty = { title: '', description: '', price: '', username: '', password: '' };
export default function UI() {
  const [list, setList] = useState([]), [f, setF] = useState(empty), [imgs, setImgs] = useState([]), [busy, setB] = useState(false);
  const load = async () => setList(await (await fetch('/api/admin/accounts')).json());
  useEffect(() => { load(); }, []);
  async function upload(e) {
    setB(true);
    for (const file of e.target.files) {
      const fd = new FormData(); fd.append('file', file);
      const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const d = await r.json(); if (d.url) setImgs((p) => [...p, d.url]);
    }
    setB(false);
  }
  async function add(e) {
    e.preventDefault(); setB(true);
    await fetch('/api/admin/accounts', { method: 'POST', body: JSON.stringify({ ...f, images: imgs }) });
    setF(empty); setImgs([]); setB(false); load();
  }
  const del = async (id) => { if (confirm('Hapus akun ini?')) { await fetch('/api/admin/accounts?id=' + id, { method: 'DELETE' }); load(); } };
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <div className="w">
      <h2>Admin Panel</h2>
      <form className="box" style={{ maxWidth: '100%' }} onSubmit={add}>
        <b>Tambah Akun</b>
        <input placeholder="Judul (cth: Akun Lv 100 + Limited)" value={f.title} onChange={set('title')} required />
        <textarea rows="3" placeholder="Deskripsi (item, robux, level, dll)" value={f.description} onChange={set('description')} />
        <input type="number" placeholder="Harga (Rp)" value={f.price} onChange={set('price')} required />
        <input placeholder="Username Roblox" value={f.username} onChange={set('username')} required />
        <input placeholder="Password akun" value={f.password} onChange={set('password')} required />
        <input type="file" accept="image/*" multiple onChange={upload} />
        <div className="gal">{imgs.map((s) => <img key={s} src={s} alt="" />)}</div>
        <button className="btn" disabled={busy}>{busy ? 'Tunggu…' : 'Simpan Akun'}</button>
      </form>
      <h3>Daftar Akun ({list.length})</h3>
      {list.map((a) => (
        <div className="row" key={a.id}>
          <span>{a.title} — <b className="gold">Rp {a.price.toLocaleString('id-ID')}</b> <span className="mut">[{a.status}]</span></span>
          <button className="btn o" onClick={() => del(a.id)}>Hapus</button>
        </div>
      ))}
    </div>
  );
}
