CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(10) NOT NULL CHECK (role IN ('admin', 'user')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sites (
    site_id SERIAL PRIMARY KEY,
    site_type VARCHAR(20) NOT NULL CHECK (site_type IN ('Villa', 'Apartment', 'Independent House', 'Open Site')),
    length INT NOT NULL,
    width INT NOT NULL,
    size_sqft INT NOT NULL,
    is_owned BOOLEAN DEFAULT FALSE,
    owner_id INT REFERENCES users(user_id) ON DELETE SET NULL,
    remaining_maintenance DECIMAL(10, 2) DEFAULT 0.00,
    status VARCHAR(20) DEFAULT 'Approved' CHECK (status IN ('Approved', 'Pending Approval'))
);

CREATE TABLE site_requests (
    request_id SERIAL PRIMARY KEY,
    site_id INT REFERENCES sites(site_id) ON DELETE CASCADE,
    owner_id INT REFERENCES users(user_id),
    request_type VARCHAR(50) CHECK (request_type IN ('Update Details', 'Payment Confirmation', 'Vacating Site')),
    requested_data JSONB, 
    request_status VARCHAR(20) DEFAULT 'Pending' CHECK (request_status IN ('Pending', 'Approved', 'Rejected')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    admin_remarks TEXT
);
