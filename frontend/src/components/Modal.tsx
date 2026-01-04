import { X } from "lucide-react"

type modalProps = {
    closeModal: () => void;
    logout: () => void;
}

export const Modal = ({closeModal, logout}: modalProps) => {

    return (
        <>
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
            <div style={{background: "#FAF0E6"}} className="p-6 rounded-lg shadow-xl max-w-md w-full mx-4 relative z-10">
                <div className="flex justify-end">
                <button className="rounded-lg p-1 hover:bg-gray-400 transition ease-in-out" onClick={closeModal}><X color="black"></X></button>
                </div>
                <div className="flex flex-col items-center justify-center">
                <h2 className="text-black text-xl font-semibold">Would you like to logout?</h2>
                <button onClick={logout} className="border-2 p-2 bg-red-600 text-white rounded-lg mt-2 hover:bg-red-800 transition ease-in-out">Continue to logout</button>
                </div>
                </div>
        </div>
        </>
    )
}