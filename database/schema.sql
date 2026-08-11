CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE IF NOT EXISTS users(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 role VARCHAR(30) NOT NULL,
 name VARCHAR(160) NOT NULL,
 mobile VARCHAR(30) UNIQUE,
 email VARCHAR(255) UNIQUE,
 password_hash TEXT,
 created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS providers(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id UUID REFERENCES users(id),
 business_name VARCHAR(200) NOT NULL,
 status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
 rating NUMERIC(3,2) DEFAULT 0,
 completed_jobs INTEGER DEFAULT 0,
 authorization_expiry DATE,
 created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS categories(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 name VARCHAR(120) NOT NULL,
 parent_id UUID REFERENCES categories(id),
 active BOOLEAN DEFAULT TRUE
);
CREATE TABLE IF NOT EXISTS services(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 category_id UUID REFERENCES categories(id),
 name VARCHAR(160) NOT NULL,
 description TEXT,
 active BOOLEAN DEFAULT TRUE
);
CREATE TABLE IF NOT EXISTS service_requests(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 request_number VARCHAR(40) UNIQUE,
 resident_id UUID REFERENCES users(id),
 service_id UUID REFERENCES services(id),
 assigned_provider_id UUID REFERENCES providers(id),
 flat_number VARCHAR(80),
 tower VARCHAR(80),
 description TEXT,
 preferred_date DATE,
 preferred_time VARCHAR(50),
 urgency VARCHAR(30),
 status VARCHAR(40) NOT NULL DEFAULT 'SUBMITTED',
 created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS reviews(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 request_id UUID UNIQUE REFERENCES service_requests(id),
 provider_id UUID REFERENCES providers(id),
 resident_id UUID REFERENCES users(id),
 rating INTEGER CHECK(rating BETWEEN 1 AND 5),
 review_text TEXT,
 created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS complaints(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 request_id UUID REFERENCES service_requests(id),
 resident_id UUID REFERENCES users(id),
 provider_id UUID REFERENCES providers(id),
 status VARCHAR(30) DEFAULT 'OPEN',
 description TEXT NOT NULL,
 created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS audit_logs(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 actor_user_id UUID REFERENCES users(id),
 action VARCHAR(160) NOT NULL,
 entity_type VARCHAR(80),
 entity_id UUID,
 metadata JSONB,
 created_at TIMESTAMPTZ DEFAULT NOW()
);
