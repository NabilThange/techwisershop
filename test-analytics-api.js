// Test script for Vercel Analytics API endpoint
// Run this after you've updated your environment variables

const API_KEY = '22226ed3333f320001df501da9becb29d0eb23d1f0a576845854afa933616af8';

async function testAnalyticsAPI() {
  console.log('🧪 Testing Analytics API endpoint...\n');
  
  try {
    // Test the endpoint (this will work once you deploy or run locally)
    const response = await fetch('http://localhost:3000/api/analytics/summary', {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
      }
    });

    console.log('📊 Response Status:', response.status);
    console.log('📊 Response Status Text:', response.statusText);

    const data = await response.json();
    console.log('📊 Response Data:', JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log('\n✅ API endpoint is working correctly!');
      
      if (data.success && data.data) {
        console.log('📈 Analytics data structure looks good');
        if (data.data.analytics) {
          console.log('📈 Analytics data received');
        }
        if (data.data.speedInsights) {
          console.log('⚡ Speed insights data received');
        }
      }
    } else {
      console.log('\n❌ API endpoint returned an error');
      console.log('Error details:', data);
    }

  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('🚨 Connection refused - make sure your Next.js app is running with:');
      console.log('   npm run dev');
    } else {
      console.log('❌ Error testing API:', error.message);
    }
  }
}

console.log('🔧 Before testing, make sure you:');
console.log('1. Update your .env.local file with actual Vercel tokens');
console.log('2. Start your development server: npm run dev');
console.log('3. Then run: node test-analytics-api.js\n');

// Uncomment the line below to run the test
// testAnalyticsAPI();

module.exports = { testAnalyticsAPI };