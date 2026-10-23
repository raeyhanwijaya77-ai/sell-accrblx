import { neon } from '@neondatabase/serverless';
export const sql = neon(process.env.DATABASE_URL);
let ready;
export function init() {
  return (ready ??= (async () => {
    await sql`create table if not exists users(id serial primary key,email text unique not null,pass text not null)`;
    await sql`create table if not exists accounts(id serial primary key,title text not null,description text default '',price int not null,images jsonb default '[]',username text not null,password text not null,status text default 'available',reserved_at timestamptz,buyer_id int,created timestamptz default now())`;
    await sql`create table if not exists orders(id text primary key,user_id int,account_id int,amount int,qr text,status text default 'pending',created timestamptz default now())`;
    await sql`create table if not exists otps(email text primary key,code text,sent timestamptz default now(),tries int default 0)`;
  })());
}
