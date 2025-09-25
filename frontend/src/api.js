const MOCK_USERS = {
    "elderly-1": {
        id: "elderly-1", 
        name: "Mrs. Shreya Kumari", 
        email: "shreya@gmail.com", 
        role: "ELDERLY" 
    },
    "caregiver-1": { 
        id: "caregiver-1", 
        name: "Sachin Kumar", 
        email: "sachin@gmail.com", 
        role: "CAREGIVER" 
    },
};

const MOCK_TRANSACTIONS = [
    { 
        id: "t1", 
        amount: 750.00, 
        description: "UPI to Grocer", 
        type: "UPI", 
        timestamp: "2024-09-25T10:30:00Z", 
        isFlagged: false, 
        alerts: [] 
    },
    { 
        id: "t2", 
        amount: 25000.00, 
        description: "Investment Scheme XYZ", 
        type: "NEFT", 
        timestamp: "2024-09-25T09:15:00Z", 
        isFlagged: true, 
        alerts: [{ 
            id: 'a1', 
            message: 'High-value transaction to an unknown investment scheme detected.' 
        }] 
    },
    { 
        id: "t3", 
        amount: 1200.00, 
        description: "Electricity Bill", 
        type: "Debit Card", 
        timestamp: "2024-09-24T14:00:00Z", 
        isFlagged: false, 
        alerts: [] 
    },
    { 
        id: "t4", 
        amount: 500.00, 
        description: "Mobile Recharge", 
        type: "UPI", 
        timestamp: "2024-09-23T18:45:00Z", 
        isFlagged: false, 
        alerts: [] 
    },
    { 
        id: "t5", 
        amount: 45000.00, 
        description: "Claim your prize money", 
        type: "IMPS", 
        timestamp: "2024-09-22T11:00:00Z", 
        isFlagged: true, 
        alerts: [{ 
            id: 'a2', 
            message: 'Transaction contains suspicious keywords ("claim prize"). Please verify.' 
        }] 
    },
];

const api = {
    login: async(email, password) => {
        console.log(`Attempting login for ${email}`);
        if (email === "shreya@gmail.com") {
            return { token: "fake-token-elderly", user: MOCK_USERS["elderly-1"] };
        }
        if (email === "sachin@gmail.com") {
            return { token: "fake-token-caregiver", user: MOCK_USERS["caregiver-1"] };
        }
        throw new Error("Invalid credentials");
    },
    getDashboard: async (token) => {
        console.log(`Fetching dashboard with token: ${token}`);
        if(token === 'fake-token-elderly') {
             return { user: MOCK_USERS['elderly-1'], transactions: MOCK_TRANSACTIONS };
        }
         if(token === 'fake-token-caregiver') {
            // Caregiver sees the elderly user's data
            return { user: MOCK_USERS['caregiver-1'], associatedUser: MOCK_USERS['elderly-1'], transactions: MOCK_TRANSACTIONS };
        }
        throw new Error("Unauthorized");
    },
    register: async (name, email, password, role) => {
        console.log(`Attempting to register ${name} with role ${role}`);
        const newUser = { id: `new-${Date.now()}`, name, email, role };
        // In a real app, you would add the user to your mock data or database
        return { token: `fake-token-${role.toLowerCase()}`, user: newUser };
    }
};

export default api;