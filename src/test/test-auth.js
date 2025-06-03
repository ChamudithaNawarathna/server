const axios = require('axios');

const testUser = {
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    password: "testpass123",
    phone: "+94771234567",
    nic: "123456789V"
};

async function testAuth() {
    try {
        // Test registration
        console.log('Testing registration...');        const registerResponse = await axios.post('http://localhost:5000/api/auth/register', testUser);
        const registerData = registerResponse.data;
        console.log('Registration response:', registerData);

        // Test login
        console.log('\nTesting login...');        const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
            email: testUser.email,
            password: testUser.password,
        });
        const loginData = loginResponse.data;
        console.log('Login response:', loginData);

    } catch (error) {
        console.error('Error:', error);
    }
}

testAuth();
