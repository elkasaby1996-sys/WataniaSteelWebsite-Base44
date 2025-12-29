create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  role text check (role in ('admin','customer')) default 'customer',
  full_name text,
  company_name text,
  phone text,
  created_at timestamptz default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  category text,
  active boolean default true,
  primary_image_url text,
  created_at timestamptz default now()
);

create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  image_url text not null,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  diameter_mm int,
  length_m numeric(8,2),
  grade text,
  unit_type text check (unit_type in ('ton','piece','bundle','sheet')) not null,
  price_qr numeric(12,2) not null,
  stock_qty numeric(12,3),
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists settings (
  key text primary key,
  value_json jsonb not null
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  source text check (source in ('store','manual')) default 'manual',
  customer_id uuid references auth.users,
  customer_email text,
  company_name text,
  contact_name text,
  phone text,
  delivery_type text check (delivery_type in ('trailer','crane','pickup')) not null,
  delivery_address text,
  preferred_delivery_date date,
  payment_method text check (payment_method in ('cod','bank_transfer')) not null,
  express boolean default false,
  notes text,
  status text check (status in ('pending_review','confirmed','in_production','ready','out_for_delivery','delivered','cancelled')) default 'pending_review',
  total_weight_kg numeric(12,2) default 0,
  subtotal_qr numeric(12,2) default 0,
  delivery_fee_qr numeric(12,2) default 0,
  express_fee_qr numeric(12,2) default 0,
  cut_bend_fee_qr numeric(12,2) default 0,
  grand_total_qr numeric(12,2) default 0,
  created_at timestamptz default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid,
  variant_id uuid,
  item_type text check (item_type in ('straight_bar','custom','product')) not null,
  diameter_mm int,
  length_m numeric(8,2),
  qty numeric(12,3) not null,
  weight_kg numeric(12,2) not null,
  unit_price_snapshot_qr numeric(12,2),
  line_total_qr numeric(12,2),
  notes text
);

create table if not exists order_files (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  file_path text not null,
  file_name text not null,
  mime_type text,
  created_at timestamptz default now()
);

create table if not exists stock_movements (
  id uuid primary key default gen_random_uuid(),
  variant_id uuid references product_variants(id),
  change_qty numeric(12,3),
  reason text check (reason in ('manual_adjustment','restock','order_confirmed','order_cancelled_restore')),
  reference_order_id uuid,
  created_by uuid references auth.users,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table product_variants enable row level security;
alter table settings enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table order_files enable row level security;
alter table stock_movements enable row level security;

create policy "Public read active products"
on products
for select
using (active = true);

create policy "Users read own profile"
on profiles
for select
using (auth.uid() = id);

create policy "Public read active variants"
on product_variants
for select
using (active = true);

create policy "Public read settings"
on settings
for select
using (true);

create policy "Public create orders"
on orders
for insert
with check (true);

create policy "Public create order items"
on order_items
for insert
with check (true);

create policy "Public create order files"
on order_files
for insert
with check (true);

create policy "Admin manage products"
on products
for all
using (exists (
  select 1 from profiles
  where profiles.id = auth.uid() and profiles.role = 'admin'
))
with check (exists (
  select 1 from profiles
  where profiles.id = auth.uid() and profiles.role = 'admin'
));

create policy "Admin manage product images"
on product_images
for all
using (exists (
  select 1 from profiles
  where profiles.id = auth.uid() and profiles.role = 'admin'
))
with check (exists (
  select 1 from profiles
  where profiles.id = auth.uid() and profiles.role = 'admin'
));

create policy "Admin manage variants"
on product_variants
for all
using (exists (
  select 1 from profiles
  where profiles.id = auth.uid() and profiles.role = 'admin'
))
with check (exists (
  select 1 from profiles
  where profiles.id = auth.uid() and profiles.role = 'admin'
));

create policy "Admin manage settings"
on settings
for all
using (exists (
  select 1 from profiles
  where profiles.id = auth.uid() and profiles.role = 'admin'
))
with check (exists (
  select 1 from profiles
  where profiles.id = auth.uid() and profiles.role = 'admin'
));

create policy "Admin read orders"
on orders
for select
using (exists (
  select 1 from profiles
  where profiles.id = auth.uid() and profiles.role = 'admin'
));

create policy "Admin update orders"
on orders
for update
using (exists (
  select 1 from profiles
  where profiles.id = auth.uid() and profiles.role = 'admin'
))
with check (exists (
  select 1 from profiles
  where profiles.id = auth.uid() and profiles.role = 'admin'
));

create policy "Admin read order items"
on order_items
for select
using (exists (
  select 1 from profiles
  where profiles.id = auth.uid() and profiles.role = 'admin'
));

create policy "Admin read order files"
on order_files
for select
using (exists (
  select 1 from profiles
  where profiles.id = auth.uid() and profiles.role = 'admin'
));

create policy "Admin manage stock movements"
on stock_movements
for all
using (exists (
  select 1 from profiles
  where profiles.id = auth.uid() and profiles.role = 'admin'
))
with check (exists (
  select 1 from profiles
  where profiles.id = auth.uid() and profiles.role = 'admin'
));

create policy "Public read product images"
on storage.objects
for select
using (bucket_id = 'product-images');

create policy "Admin upload product images"
on storage.objects
for insert
with check (
  bucket_id = 'product-images'
  and exists (
    select 1 from profiles
    where profiles.id = auth.uid() and profiles.role = 'admin'
  )
);

create policy "Admin delete product images"
on storage.objects
for delete
using (
  bucket_id = 'product-images'
  and exists (
    select 1 from profiles
    where profiles.id = auth.uid() and profiles.role = 'admin'
  )
);
