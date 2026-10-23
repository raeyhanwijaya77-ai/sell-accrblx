import { sql } from './db';
const B = 'https://app.pakasir.com/api';
export async function createQris(order_id, amount) {
  const r = await fetch(`${B}/transactioncreate/qris`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ project: process.env.PAKASIR_SLUG, order_id, amount, api_key: process.env.PAKASIR_API_KEY }) });
  return (await r.json())?.payment?.payment_number;
}
export async function isPaid(o) {
  const u = new URL(`${B}/transactiondetail`);
  u.search = new URLSearchParams({ project: process.env.PAKASIR_SLUG, amount: o.amount, order_id: o.id, api_key: process.env.PAKASIR_API_KEY });
  try { return (await (await fetch(u)).json())?.transaction?.status === 'completed'; } catch { return false; }
}
export async function finalize(o) {
  const r = await sql`update orders set status='paid' where id=${o.id} and status='pending' returning id`;
  if (r.length) await sql`update accounts set status='sold',buyer_id=${o.user_id} where id=${o.account_id}`;
}
