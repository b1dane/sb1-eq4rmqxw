/*
  # Create leads table

  1. New Tables
    - `leads`
      - `id` (uuid, primary key, auto-generated)
      - `name` (text, not null) - Full name of the lead
      - `phone` (text, not null) - Phone number
      - `email` (text, not null) - Email address
      - `service` (text, not null) - Selected service from dropdown
      - `created_at` (timestamptz, default now()) - Timestamp of submission

  2. Security
    - Enable RLS on `leads` table
    - Add INSERT policy allowing anyone (including unauthenticated) to submit leads
    - No SELECT/UPDATE/DELETE policies - leads are write-only from the client
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  service text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
