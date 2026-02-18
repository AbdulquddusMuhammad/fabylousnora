
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Read .env manually to avoid dependencies
const envPath = path.resolve(__dirname, '../.env');
try {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const env = {};
    envContent.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            env[key.trim()] = value.trim();
        }
    });

    const SUPABASE_URL = env.VITE_SUPABASE_URL;
    const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        console.error("Missing Supabase credentials in .env");
        process.exit(1);
    }

    console.log("Loaded ENV:");
    console.log("URL:", SUPABASE_URL);
    console.log("ANON_KEY (first 10 chars):", SUPABASE_ANON_KEY ? SUPABASE_ANON_KEY.substring(0, 10) + "..." : "MISSING");



    // Allow override via command line argument
    const FUNCTION_URL = process.argv[2] || `${SUPABASE_URL}/functions/v1/usps-service`;

    console.log("Testing USPS Integration...");
    console.log(`Target: ${FUNCTION_URL}`);

    // Test 1: Address Validation
    console.log("\n--- Test 1: Address Validation ---");
    const responseAttributes = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
            action: 'validate',
            address: {
                street: '1600 Pennsylvania Ave NW',
                city: 'Washington',
                state: 'DC',
                zipCode: '20500'
            }
        })
    });

    const data = await responseAttributes.json();
    console.log("Status:", responseAttributes.status);
    console.log("Response:", JSON.stringify(data, null, 2));

    // Test 2: Shipping Rates
    console.log("\n--- Test 2: Shipping Rates ---");
    const responseRates = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
            action: 'rates',
            address: {
                zipCode: '20500'
            },
            packageDetails: {
                weight: 16 // 1 lb
            }
        })
    });

    const rateData = await responseRates.json();
    console.log("Status:", responseRates.status);
    console.log("Response:", JSON.stringify(rateData, null, 2));

} catch (err) {
    console.error("Script Error:", err);
}
