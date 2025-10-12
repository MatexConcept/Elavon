
// import { neon } from "@neondatabase/serverless";
// import "dotenv/config";


// export const sql = neon(process.env.DATABASE_URL);

// export async function initDB() {
//   try {
  
//     await sql`
//       CREATE TABLE IF NOT EXISTS transactions (
//         id SERIAL PRIMARY KEY,
//         user_id VARCHAR(255) NOT NULL,
//         title VARCHAR(255) NOT NULL,
//         amount DECIMAL(10,2) NOT NULL,
//         category VARCHAR(255) NOT NULL,
//         created_at DATE NOT NULL DEFAULT CURRENT_DATE
//       )
//     `;

//     await sql`
//       CREATE TABLE IF NOT EXISTS elavon_transactions (
//         id VARCHAR(64) PRIMARY KEY,
//         date TIMESTAMP WITH TIME ZONE,  -- editable by admin
//         description TEXT,
//         type VARCHAR(20) CHECK (type IN ('debit', 'credit')),
//         amount NUMERIC(12,2),
//         currency VARCHAR(10) DEFAULT 'USD',
//         status VARCHAR(50) DEFAULT 'pending',
//         updated_at TIMESTAMP DEFAULT NOW(),
//         created_by VARCHAR(255) DEFAULT 'admin'
//       )
//     `;

//     console.log("✅ Database initialized successfully (all tables ready)");
//   } catch (error) {
//     console.error("❌ DB initialization error:", error);
//     process.exit(1);
//   }
// }


import { neon } from "@neondatabase/serverless";
import "dotenv/config";

export const sql = neon(process.env.DATABASE_URL);

export async function initDB() {
  try {
  
    await sql`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
      )
    `;

 
    // await sql`DROP TABLE IF EXISTS elavon_transactions`;

  
    await sql`
      CREATE TABLE IF NOT EXISTS elavon_transactions (
        transaction_id VARCHAR(64) PRIMARY KEY,
        recipient_name VARCHAR(255) NOT NULL,
        date TIMESTAMP WITH TIME ZONE NOT NULL,
        description TEXT,
        type VARCHAR(20) NOT NULL CHECK (type IN ('debit', 'credit')),
        amount NUMERIC(12,2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'USD',
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        created_by VARCHAR(255) DEFAULT 'admin'
      )
    `;

    //   await sql`DROP TABLE IF EXISTS app_settings`;

 await sql`
  CREATE TABLE IF NOT EXISTS app_settings (
    id SERIAL PRIMARY KEY,
    account_balance NUMERIC(15, 0) NOT NULL,
    profile_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  )
`;

    console.log("✅ Database initialized successfully (all tables ready)");
  } catch (error) {
    console.error("❌ DB initialization error:", error);
    process.exit(1);
  }
}