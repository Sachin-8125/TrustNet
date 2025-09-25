import { useEffect, useState } from "react";
import {LogOutIcon} from './icons'
export default function Dashboard({user, token, onLogout}){
    const [data, setData] = useState({ transactions: [], associatedUser: null });
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async() => {
            setIsLoading(true);
            try {
                const dashboardData = await api.getDashboard(token);
                setData(dashboardData);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            }
            setIsLoading(false);
        }
        fetchData();
    }, [token]);

    const greeting = user.role === 'CAREGIVER'
        ? `Namaste, ${user.name}. You are viewing the account for ${data.associatedUser?.name || '...'}.`
        : `Namaste, ${user.name}.`;

    const flaggedTransactions = data.transactions.filter(t => t.isFlagged);

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{greeting}</h1>
                    <p className="text-gray-500">Here is your financial summary and alerts.</p>
                </div>
                <button
                    onClick={onLogout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition">
                    <LogOutIcon />
                    <span className="hidden md:block">Logout</span>
                </button>
            </header>

            {isLoading ? (
                <p>Loading transactions...</p>
            ) : (
                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {flaggedTransactions.length > 0 && <Alerts alerts={flaggedTransactions.flatMap(t => t.alerts)} />}
                        <TransactionList transactions={data.transactions} />
                    </div>
                    <div className="lg:col-span-1">
                        <ProfileCard user={user.role === 'CAREGIVER' ? data.associatedUser : user} />
                    </div>
                </main>
            )}
        </div>
    )
}