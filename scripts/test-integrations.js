// scripts/test-integrations.js
// Run this script with: node scripts/test-integrations.js

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const FUNCTIONS = {
    1: {
        name: 'mailerlite-newsletter',
        params: ['email'],
        defaultParams: { email: 'test@example.com' }
    },
    2: {
        name: 'resend-order-alert',
        params: ['order_id'], // Requires a valid order ID in DB, or we can mock creating one if needed, but let's stick to existing ID
        defaultParams: { order_id: 1 }
    }
};

const SUPABASE_PROJECT_REF = 'your-project-ref'; // Replace or ask user
const SUPABASE_ANON_KEY = 'your-anon-key'; // Replace or ask user

console.log("\n--- Supabase Edge Function Tester ---\n");
console.log("1. Test Newsletter (MailerLite)");
console.log("2. Test Order Alert (Resend)");

rl.question("\nSelect function to test (1 or 2): ", async (choice) => {
    const func = FUNCTIONS[choice];
    if (!func) {
        console.error("Invalid choice.");
        rl.close();
        return;
    }

    console.log(`\nTesting: ${func.name}`);

    // Get Function URL
    rl.question("Enter Function URL (e.g. http://127.0.0.1:54321/functions/v1/mailerlite-newsletter or https://<project>.supabase.co/functions/v1/...): ", async (url) => {

        if (!url) {
            // Try to construct if project ref provided? No, let's just require it for now or default to local
            url = `http://127.0.0.1:54321/functions/v1/${func.name}`;
            console.log(`Using default local URL: ${url}`);
        }

        // Get Auth Header
        rl.question("Enter Supabase Anon Key (needed for authorization): ", async (anonKey) => {
            if (!anonKey) {
                console.error("Anon Key is required!");
                rl.close();
                return;
            }

            // Get Parameters
            const payload = {};
            for (const param of func.params) {
                await new Promise(resolve => {
                    rl.question(`Enter ${param}: `, (val) => {
                        payload[param] = val || func.defaultParams[param];
                        resolve();
                    });
                });
            }

            // Special case for resend: if order_id provided, we send just that. If testing mocking, we might need full object? 
            // The current implementation fetches from DB, so order_id MUST exist.
            if (func.name === 'resend-order-alert') {
                // Check if user wants to mock full object (for testing without DB) or use ID
                // But our code uses DB fetch. So ID is required.
                if (!payload.order_id) {
                    console.log("Note: You must provide a valid order_id that exists in your 'orders' table for this to work.");
                }
            }

            console.log("\nSending Payload:", JSON.stringify(payload, null, 2));

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${anonKey}`
                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();
                console.log(`\nStatus: ${response.status}`);
                console.log("Response:", JSON.stringify(data, null, 2));

            } catch (error) {
                console.error("\nError invoking function:", error.message);
            } finally {
                rl.close();
            }
        });
    });
});
