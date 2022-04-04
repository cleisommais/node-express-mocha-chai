# Project Express Node + Mocha Chai

### Data model

Tables:
users: (id: serial,email: character,password: character, first_name: character, last_name: character, role: character, age: int, country: character,created_at: timestamp, updated_at: timestamp)

users_access: (id: serial, user_id: int, resource: character, action: character, created_at: timestamp)

courses: (id: serial, name, description, keywords, skill_level, language, created_at, updated_at)

lectures(id: serial, name, order: int, preview: boolean, link, created_at, updated_at)
