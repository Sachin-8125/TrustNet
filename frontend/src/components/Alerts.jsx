import { AlertTriangleIcon } from "./icons";
export default function Alerts({alerts}){
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-red-500">
            <div className="flex items-center mb-4">
                <AlertTriangleIcon className="text-red-500 h-8 w-8 mr-4" />
                <h2 className="text-2xl font-bold text-gray-800">Immediate Attention Required</h2>
            </div>
            <ul className="space-y-3">
                {alerts.map(alert => (
                    <li key={alert.id} className="text-gray-700 bg-red-50 p-3 rounded-lg">
                        {alert.message}
                    </li>
                ))}
            </ul>
        </div>
    );
}