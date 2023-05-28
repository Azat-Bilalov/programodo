// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use postgres::{Client, NoTls};

struct User {
    id: i32,
    login: String,
    email: String,
    hash_password: String,
}

struct DBClient {
    conn: Client,
}

impl DBClient {
    fn new() -> Result<Self, postgres::Error> {
        let conn = Client::connect("postgres://root:root@localhost:5432/programodo", NoTls)?;
        Ok(DBClient { conn })
    }

    fn get_user(&mut self, id: i32) -> Result<Option<User>, postgres::Error> {
        let stmt = self.conn.prepare("SELECT * FROM client WHERE id = $1")?;
        let rows = self.conn.query(&stmt, &[&id])?;
        if rows.is_empty() {
            Ok(None)
        } else {
            let row = rows.get(0).unwrap();

            let user = Some(User {
                id: row.get(0),
                login: row.get(1),
                email: row.get(2),
                hash_password: row.get(3),
            });
            Ok(user)
        }
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
