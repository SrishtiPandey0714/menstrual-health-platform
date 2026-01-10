'use client';

import { useState } from 'react';
import { apiCall } from '@/lib/api';

export default function TestAPIPage() {
    const [foodData, setFoodData] = useState<any>(null);
    const [beverageData, setBeverageData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const testAPI = async () => {
        setLoading(true);

        try {
            const timestamp = Date.now();

            // Test Food API using apiCall helper
            console.log('Calling food API...');
            const foodResponse = await apiCall(`/api/food?phase=menstrual&_t=${timestamp}`);

            if (foodResponse.ok) {
                const food = await foodResponse.json();
                console.log('Food response:', food);
                setFoodData(food);
            } else {
                const error = await foodResponse.json();
                console.error('Food error:', error);
                setFoodData({ error: error.message || 'Failed to load food' });
            }

            // Test Beverages API
            console.log('Calling beverages API...');
            const bevResponse = await apiCall(`/api/beverages?phase=menstrual&_t=${timestamp}`);

            if (bevResponse.ok) {
                const beverages = await bevResponse.json();
                console.log('Beverages response:', beverages);
                setBeverageData(beverages);
            } else {
                const error = await bevResponse.json();
                console.error('Beverages error:', error);
                setBeverageData({ error: error.message || 'Failed to load beverages' });
            }

        } catch (error: any) {
            console.error('Test Error:', error);
            setFoodData({ error: error.message });
            setBeverageData({ error: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">API Test Page</h1>
                <p className="text-gray-600 mb-6">Testing with userId: <code className="bg-gray-200 px-2 py-1 rounded">test2</code></p>

                <button
                    onClick={testAPI}
                    disabled={loading}
                    className="bg-[#DB2777] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#BE185D] disabled:opacity-50"
                >
                    {loading ? 'Testing...' : 'Test API (Fresh Data)'}
                </button>

                {foodData && (
                    <div className="mt-8 bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Food API Response:</h2>
                        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm max-h-96">
                            {JSON.stringify(foodData, null, 2)}
                        </pre>
                    </div>
                )}

                {beverageData && (
                    <div className="mt-8 bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Beverages API Response:</h2>
                        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm max-h-96">
                            {JSON.stringify(beverageData, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}
