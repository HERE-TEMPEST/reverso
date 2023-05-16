CREATE TYPE provider_name as enum ('github', 'google', 'local');

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    login VARCHAR(30),
    password VARCHAR(30),
    provider provider_name,
    provider_id TEXT
);

CREATE TABLE IF NOT EXISTS words (
    word TEXT PRIMARY KEY NOT NULL,
    amount INTEGER NOT NULL,
    POS VARCHAR(30),
    animacy VARCHAR(30),
    "case" VARCHAR(30),
    gender VARCHAR(30),
    mood VARCHAR(30),
    "number" VARCHAR(30),
    person VARCHAR(30),
    tense VARCHAR(30),
    transitivity VARCHAR(30),
    voice VARCHAR(30),
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO users (login, password, provider, provider_id)
VALUES ('test_login', 'pass1234', 'local', 'provider_test');

INSERT INTO words (
  word,
  amount,
  POS,
  animacy,
  "case",
  gender,
  mood,
  "number",
  person,
  tense,
  transitivity,
  voice,
  user_id
)
VALUES ('машина', 1, 'NOUN', 'inan', 'nomn', 'femn', NULL, 'sing', NULL, NULL, NULL, NULL, 1);