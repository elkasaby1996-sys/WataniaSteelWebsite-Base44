# Supabase Backend Setup

This project uses Supabase for database, auth, and storage.

## 1) Create Supabase project
- Create a new project at https://app.supabase.com
- Note the **Project URL** and **Anon public key**.

## 2) Environment variables
Copy `.env.example` to `.env` and fill in:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 3) Database schema
Run the SQL in `supabase_schema.sql` inside the Supabase SQL editor.

This creates:
- Products, variants, images
- Orders, order items, and order files
- Settings for delivery + express fees
- Profiles with admin roles
- RLS policies

## 4) Storage buckets
Create two public buckets in Supabase Storage:

1. `product-images` (public read)
2. `order-files` (public read)

## 5) Create an admin user
1. Create a user in the Supabase Auth dashboard.
2. Insert/update the profile:

```sql
insert into profiles (id, role, full_name)
values ('AUTH_USER_UUID', 'admin', 'Admin User')
on conflict (id)
do update set role = 'admin';
```

## 6) Settings seed (optional)
Insert delivery + express fee settings:

```sql
insert into settings (key, value_json)
values
  ('delivery_fees', '{"trailer":200,"crane":700,"pickup":0}'),
  ('express_fee', '{"enabled":true,"fee":500}')
on conflict (key) do update set value_json = excluded.value_json;
```

## 7) Local development
```
npm install
npm run dev
```

## 8) Netlify deploy notes
- Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to Netlify environment variables.
- Ensure Supabase Storage buckets are public for the store/product image URLs.
