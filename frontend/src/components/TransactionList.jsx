export default function TransactionList({transactions}){
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
            <div className="flow-root">
                <ul role="list" className="-mb-8">
                    {transactions.map((transaction, transactionIdx) => (
                        <li key={transaction.id}>
                            <div className="relative pb-8">
                                {transactionIdx !== transactions.length - 1 ? (
                                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                                ) : null}
                                <div className="relative flex space-x-4 items-start">
                                    <div>
                                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${transaction.isFlagged ? 'bg-red-500' : 'bg-blue-500'}`}>
                                            {transaction.isFlagged ? (
                                                <AlertTriangleIcon className="h-5 w-5 text-white" />
                                            ) : (
                                                <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </span>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex justify-between items-center">
                                            <p className="text-md text-gray-800 font-semibold">{transaction.description}</p>
                                            <p className={`text-md font-bold ${transaction.isFlagged ? 'text-red-600' : 'text-gray-700'}`}>
                                                ₹{transaction.amount.toFixed(2)}
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {new Date(transaction.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
