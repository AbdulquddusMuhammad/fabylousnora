
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Read .env manually
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

    const FUNCTION_URL = process.argv[2] || `${SUPABASE_URL}/functions/v1/shippo-service`;

    console.log("Testing Shippo Integration...");
    console.log(`Target: ${FUNCTION_URL}`);

    // Test 1: Address Validation
    console.log("\n--- Test 1: Address Validation ---");
    const addressData = {
        action: 'validate',
        address: {
            name: "Shawn Ippotle",
            street: '215 Clayton St.',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94117'
        }
    };

    const responseAttributes = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify(addressData)
    });

    const data = await responseAttributes.json();
    console.log("Status:", responseAttributes.status);
    console.log("Response:", JSON.stringify(data, null, 2));

    // Test 2: Shipping Rates
    console.log("\n--- Test 2: Shipping Rates ---");
    const rateData = {
        action: 'rates',
        address: {
            name: "Customer Name",
            street: '215 Clayton St.',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94117'
        },
        packageDetails: {
            weight: 16 // 1 lb in oz
        }
    };

    const responseRates = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify(rateData)
    });

    const rates = await responseRates.json();
    console.log("Status:", responseRates.status);
    console.log("Response:", JSON.stringify(rates, null, 2));

} catch (err) {
    console.error("Script Error:", err);
}
