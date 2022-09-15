const createMovies = `
  CREATE TABLE IF NOT EXISTS movies(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR,
  description VARCHAR,
  rating INT,
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT user_movies FOREIGN KEY (user_id) REFERENCES users (id)
)`;