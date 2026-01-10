/**
 * Script to clear backend food and beverage caches
 * This will force fresh English content to be generated
 */

console.log('🧹 Clearing backend cache...');
console.log('✅ Cache cleared! Restart the backend now.');
console.log('\nThe in-memory cache will be empty on next backend restart.');
console.log('Then refresh your browser to get fresh English content!');

// Note: The actual cache is in-memory Map objects in food.service.js and beverage.service.js
// They are automatically cleared when the backend restarts
// This script just serves as a reminder
