export default function ProfileCard({user}){
    if(!user) return null;
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
             <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4 inline-flex">
                <UserIcon />
            </div>
            <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
            <p className="text-gray-500">{user.email}</p>
            <div className="mt-6 space-y-4">
                 <button className="w-full bg-blue-50 text-blue-700 font-semibold py-3 px-4 rounded-lg hover:bg-blue-100 transition">
                    Manage Trusted Contacts
                </button>
                 <button className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition">
                    View Profile Settings
                </button>
            </div>
        </div>
    );
}