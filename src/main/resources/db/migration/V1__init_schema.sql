CREATE TABLE coordinates (
    id BIGSERIAL PRIMARY KEY,
    x BIGINT NOT NULL,
    y DOUBLE PRECISION NOT NULL,

    CONSTRAINT chk_coord_x_greater_than_min CHECK (x > -220)
);

CREATE TABLE location (
    id BIGSERIAL PRIMARY KEY,
    x BIGINT NOT NULL,
    y BIGINT NOT NULL,
    name VARCHAR(255)
);

CREATE TABLE address (
    id BIGSERIAL PRIMARY KEY,
    zip_code VARCHAR(255),
    town_id BIGINT REFERENCES location(id) ON DELETE RESTRICT,

    CONSTRAINT chk_address_zip_code_length CHECK (zip_code IS NULL OR length(zip_code) >= 6)
);

CREATE TABLE organization (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    official_address_id BIGINT NOT NULL REFERENCES address(id) ON DELETE RESTRICT,
    annual_turnover BIGINT NOT NULL,
    employees_count INT NOT NULL,
    rating REAL NOT NULL,
    type VARCHAR(50),
    postal_address_id BIGINT NOT NULL REFERENCES address(id) ON DELETE RESTRICT,

    CONSTRAINT chk_org_name_not_empty CHECK (length(trim(name)) > 0),
    CONSTRAINT chk_org_annual_turnover_positive CHECK (annual_turnover > 0),
    CONSTRAINT chk_org_employees_count_positive CHECK (employees_count > 0),
    CONSTRAINT chk_org_rating_positive CHECK (rating > 0)
);

CREATE TABLE person (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    eye_color VARCHAR(50),
    hair_color VARCHAR(50) NOT NULL,
    location_id BIGINT REFERENCES location(id) ON DELETE RESTRICT,
    weight INT,
    nationality VARCHAR(50) NOT NULL,

    CONSTRAINT chk_person_weight_positive CHECK (weight IS NULL OR weight > 0),
    CONSTRAINT chk_person_name_not_empty CHECK (length(trim(name)) > 0)
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    coordinates_id BIGINT NOT NULL REFERENCES coordinates(id) ON DELETE RESTRICT,
    creation_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    unit_of_measure VARCHAR(50) NOT NULL,
    manufacturer_id BIGINT NOT NULL REFERENCES organization(id) ON DELETE RESTRICT,
    price REAL NOT NULL,
    manufacture_cost DOUBLE PRECISION,
    rating DOUBLE PRECISION NOT NULL,
    part_number VARCHAR(84) NOT NULL,
    owner_id BIGINT NOT NULL REFERENCES person(id) ON DELETE RESTRICT,

    CONSTRAINT chk_prod_price_positive CHECK (price > 0),
    CONSTRAINT chk_prod_rating_positive CHECK (rating > 0),
    CONSTRAINT chk_prod_part_number_length CHECK (length(trim(part_number)) >= 28),
    CONSTRAINT chk_prod_name_not_empty CHECK (length(trim(name)) > 0)
);
