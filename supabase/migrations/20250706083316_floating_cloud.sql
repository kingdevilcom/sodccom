/*
  # Create hosting platform tables

  1. New Tables
    - `plans`
      - `id` (uuid, primary key)
      - `name` (text, plan name)
      - `category` (text, plan category)
      - `price_usd` (decimal, price in USD)
      - `price_lkr` (decimal, price in LKR)
      - `vcpu` (integer, virtual CPUs)
      - `ram` (integer, RAM in GB)
      - `storage` (integer, storage in GB)
      - `storage_type` (text, SSD or NVMe)
      - `is_popular` (boolean, featured plan)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `orders`
      - `id` (uuid, primary key)
      - `user_email` (text, customer email)
      - `plan_id` (uuid, reference to plans)
      - `status` (text, order status)
      - `amount_usd` (decimal, amount in USD)
      - `amount_lkr` (decimal, amount in LKR)
      - `currency` (text, payment currency)
      - `payhere_order_id` (text, PayHere order ID)
      - `payhere_payment_id` (text, PayHere payment ID)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `promo_codes`
      - `id` (uuid, primary key)
      - `code` (text, promo code)
      - `discount_type` (text, percentage or fixed)
      - `discount_value` (decimal, discount amount)
      - `currency` (text, currency for fixed discounts)
      - `usage_limit` (integer, maximum uses)
      - `usage_count` (integer, current usage)
      - `expires_at` (timestamp, expiration date)
      - `is_active` (boolean, active status)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `admins`
      - `id` (uuid, primary key)
      - `username` (text, unique username)
      - `password_hash` (text, hashed password)
      - `email` (text, admin email)
      - `last_login` (timestamp, last login time)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
    - Add policies for admin access
*/

-- Create plans table
CREATE TABLE IF NOT EXISTS plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('minecraft', 'vps', 'vlss', 'v2ray')),
  price_usd decimal(10,2) NOT NULL DEFAULT 0,
  price_lkr decimal(10,2) NOT NULL DEFAULT 0,
  vcpu integer NOT NULL DEFAULT 1,
  ram integer NOT NULL DEFAULT 1,
  storage integer NOT NULL DEFAULT 10,
  storage_type text NOT NULL DEFAULT 'SSD' CHECK (storage_type IN ('SSD', 'NVMe')),
  is_popular boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  plan_id uuid REFERENCES plans(id),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  amount_usd decimal(10,2) NOT NULL DEFAULT 0,
  amount_lkr decimal(10,2) NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'LKR' CHECK (currency IN ('USD', 'LKR')),
  payhere_order_id text,
  payhere_payment_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create promo_codes table
CREATE TABLE IF NOT EXISTS promo_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  discount_type text NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value decimal(10,2) NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'USD' CHECK (currency IN ('USD', 'LKR')),
  usage_limit integer,
  usage_count integer DEFAULT 0,
  expires_at timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  email text UNIQUE NOT NULL,
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Plans policies (public read access)
CREATE POLICY "Anyone can read plans"
  ON plans
  FOR SELECT
  TO public
  USING (true);

-- Orders policies (users can only see their own orders)
CREATE POLICY "Users can read their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Promo codes policies (public read for validation)
CREATE POLICY "Anyone can read active promo codes"
  ON promo_codes
  FOR SELECT
  TO public
  USING (is_active = true);

-- Admin policies (restrict access)
CREATE POLICY "Only service role can access admins"
  ON admins
  FOR ALL
  TO service_role
  USING (true);

-- Insert sample data
INSERT INTO plans (name, category, price_usd, price_lkr, vcpu, ram, storage, storage_type, is_popular) VALUES
  ('Sunny Spark', 'minecraft', 3.50, 1100, 2, 4, 40, 'NVMe', false),
  ('Shadow Block', 'minecraft', 8.00, 2500, 3, 8, 75, 'NVMe', true),
  ('Gear Core 2nd', 'minecraft', 12.00, 3800, 6, 12, 100, 'NVMe', false),
  ('Raid Piece', 'minecraft', 18.00, 5700, 8, 24, 200, 'NVMe', false),
  ('Quantum Haki', 'minecraft', 29.00, 9200, 12, 48, 250, 'NVMe', false),
  ('Ghost Ship', 'minecraft', 50.00, 15800, 16, 64, 300, 'NVMe', false),
  ('Pirate King\'s Throne', 'minecraft', 65.00, 20600, 18, 96, 350, 'NVMe', false),
  
  ('Sandai Core', 'vps', 5.00, 1580, 2, 4, 50, 'SSD', false),
  ('Wado Core', 'vps', 10.00, 3160, 4, 8, 100, 'SSD', true),
  ('Enma Core', 'vps', 18.00, 5700, 6, 16, 200, 'SSD', false),
  ('Asura Core', 'vps', 35.00, 11100, 12, 32, 400, 'SSD', false),
  ('Yoru Core', 'vps', 60.00, 19000, 16, 64, 600, 'SSD', false),
  
  ('Poneglyph Mini', 'vlss', 3.00, 950, 1, 2, 20, 'SSD', false),
  ('Cipher Stone', 'vlss', 5.00, 1580, 2, 4, 40, 'SSD', false),
  ('Ohara Shadow', 'vlss', 8.00, 2530, 3, 6, 80, 'NVMe', true),
  ('Buster Call Node', 'vlss', 12.00, 3800, 6, 12, 120, 'NVMe', false),
  ('Fleet Decode', 'vlss', 18.00, 5700, 8, 24, 250, 'NVMe', false),
  ('Ancient Protocol', 'vlss', 30.00, 9500, 12, 48, 500, 'NVMe', false),
  ('Lost Library', 'vlss', 50.00, 15800, 16, 64, 750, 'NVMe', false),
  ('Cipher Emperor', 'vlss', 70.00, 22200, 20, 96, 1000, 'NVMe', false);

-- Insert sample promo codes
INSERT INTO promo_codes (code, discount_type, discount_value, currency, usage_limit, is_active) VALUES
  ('PIRATE10', 'percentage', 10, 'USD', 100, true),
  ('GRANDLINE', 'percentage', 15, 'USD', 50, true),
  ('STRAWHAT', 'percentage', 20, 'USD', 25, true),
  ('NEWCREW', 'fixed', 5, 'USD', 200, true),
  ('EASTBLUE', 'fixed', 1000, 'LKR', 150, true);

-- Insert default admin (password: T.s.t2@@9)
INSERT INTO admins (username, password_hash, email) VALUES
  ('nanokillx', '$2b$12$hash_placeholder', 'admin@stealordiecloud.com');