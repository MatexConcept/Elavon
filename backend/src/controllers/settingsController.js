import { sql } from '../config/db.js';


export const getSettings = async (req, res) => {
  try {
    const result = await sql`SELECT * FROM app_settings LIMIT 1`;

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No settings found. Please create settings first.'
      });
    }

    res.json({
      success: true,
      data: {
        phone_number: result[0].phone_number,
        company_name: result[0].company_name
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get settings'
    });
  }
};

// 2. POST - Save phone number and company name (first time or update both)
export const saveSettings = async (req, res) => {
  try {
    const { account_balance, profile_name } = req.body;

    if (!account_balance || !profile_name) {
      return res.status(400).json({
        success: false,
        error: 'Please provide both account_balncer and profile_name'
      });
    }

    
    const existing = await sql`SELECT * FROM app_settings LIMIT 1`;

    let result;
    if (existing.length > 0) {
      
      result = await sql`
        UPDATE app_settings 
        SET  account_balance = ${account_balance}, 
            profile_name = ${profile_name},
            updated_at = NOW()
        WHERE id = ${existing[0].id}
        RETURNING *
      `;
    } else {
      // Create new
      result = await sql`
        INSERT INTO app_settings (account_balance, profile_name)
        VALUES (${account_balance}, ${profile_name})
        RETURNING *
      `;
    }

    res.json({
      success: true,
      message: 'Settings saved successfully',
      data: {
       account_balance: result[0].account_balance,
        profile_name: result[0].profile_name
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save settings'
    });
  }
};

// 3. PATCH - Update just the phone number OR just the company name OR both
export const updateSettings = async (req, res) => {
  try {
    const { account_balance, profile_name } = req.body;

    const existing = await sql`SELECT * FROM app_settings LIMIT 1`;

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No settings found. Create settings first using POST.'
      });
    }

    const result = await sql`
      UPDATE app_settings 
      SET 
        account_balance = COALESCE(${account_balance},  account_balance),
        profile_name = COALESCE(${profile_name}, profile_name),
        updated_at = NOW()
      WHERE id = ${existing[0].id}
      RETURNING *
    `;

    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: {
        account_balance: result[0].account_balance,
        profile_name: result[0].profile_name
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update settings'
    });
  }
};