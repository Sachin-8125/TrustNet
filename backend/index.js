import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from './generated/prisma/index.js'

const app = express()
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || "your-secret";
const PORT = process.env.PORT || 3001;
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

//auth middleware
const authToken = (req,res,next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if(token==null) return res.sendStatus(401);

    jwt.verify(token,JWT_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

//auth routes
app.post('/api/auth/register', async (req, res) => {
    const { email, password, name, role } = req.body;
    if (!email || !password || !name || !role) {
        return res.status(400).json({ error: 'Missing required fields: email, password, name, role' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role
            }
        })
        res.status(201).json({ message: "User created successfully", userId: user.id });
    } catch (error) {
        res.status(400).json({ error: "User already exists" });
    } 
});

app.post('/api/auth/login',async(req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user.id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: "Internal server error during login" });
    }
});

//api routes
app.get('/api/dashboard',authToken,async(req,res)=>{
    const userId = req.user.userId;
    try {
        const user = await prisma.user.findUnique({ where: { id: userId }});
        const transactions = await prisma.transaction.findMany({
            where: { userId: userId },
            orderBy: { timestamp: 'desc' },
            take: 10,
            include: { alerts: true }
        });
        res.json({ user, transactions });
    } catch (error) {
        res.status(500).json({ error: "Could not fetch dashboard data." });
    }
});

app.post('/api/transactions', authToken, async (req, res) => {
    const { amount, description, type } = req.body;
    const userId = req.user.userId;

    let isFlagged = false;
    const fraudRiskMessage = 'This transaction is unusual. Please review it carefully.';

    // Safely normalize inputs
    const amountNum = Number(amount) || 0;
    const desc = (description ?? '').toString();
    const descLower = desc.toLowerCase();

    if (amountNum > 20000 || descLower.includes('lottery') || descLower.includes('claim prize')) {
        isFlagged = true;
    }

    try {
        const transaction = await prisma.transaction.create({
            data: { amount: amountNum, description: desc, type, userId, isFlagged },
        });

        if (isFlagged) {
            await prisma.alert.create({
                data: { message: fraudRiskMessage, transactionId: transaction.id }
            });
        }

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add transaction.' });
    }
});

// health check for Render
app.get('/health', (req, res) => {
    res.status(200).send('ok')
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
