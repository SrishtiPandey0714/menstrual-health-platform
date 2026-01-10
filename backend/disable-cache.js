/**
 * EMERGENCY FIX: Temporarily disable caching to force fresh generation
 * Use this only for debugging - remove after fixing the cache issue
 */

const fs = require('fs');
const path = require('path');

console.log('🚨 EMERGENCY CACHE DISABLE SCRIPT');
console.log('This will temporarily set cache TTL to 0 to force fresh generation\n');

const foodServicePath = path.join(__dirname, 'src', 'services', 'food.service.js');
const beverageServicePath = path.join(__dirname, 'src', 'services', 'beverage.service.js');

// Read food service
let foodCode = fs.readFileSync(foodServicePath, 'utf8');
// Set cache TTL to 0 (disabled)
foodCode = foodCode.replace(/const CACHE_TTL = .*?;/, 'const CACHE_TTL = 0; // DISABLED FOR DEBUGGING');
fs.writeFileSync(foodServicePath, foodCode);
console.log('✅ Disabled food cache');

// Read beverage service
let beverageCode = fs.readFileSync(beverageServicePath, 'utf8');
// Set cache TTL to 0 (disabled)
beverageCode = beverageCode.replace(/const CACHE_TTL = .*?;/, 'const CACHE_TTL = 0; // DISABLED FOR DEBUGGING');
fs.writeFileSync(beverageServicePath, beverageCode);
console.log('✅ Disabled beverage cache');

console.log('\n✅ Cache disabled! Now restart the backend:');
console.log('   1. Press Ctrl+C to stop backend');
console.log('   2. Run: npm start');
console.log('   3. Refresh browser - should generate fresh English content!');
console.log('\n⚠️  Remember to re-enable cache after testing!');
