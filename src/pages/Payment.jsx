import React, { useState } from 'react';
import { 
    FaLock, 
    FaUniversity, 
    FaMobileAlt, 
    FaGoogle, 
    FaQrcode, 
    FaChevronRight, 
    FaCheckCircle 
} from 'react-icons/fa';

export default function Payment() {
    const [method, setMethod] = useState('upi');
    const [selectedBank, setSelectedBank] = useState('');

    return (
        <div className='flex justify-center items-center min-h-screen w-full bg-gray-50'>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                
                {/* Header */}
                <div className="bg-indigo-600 px-8 py-6 text-white">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Payment</h2>
                        <FaLock className="text-xl opacity-80" />
                    </div>
                    <div className="mt-2 flex justify-between items-end">
                        <p className="text-indigo-200 text-sm">Amount to pay</p>
                        <p className="text-2xl font-bold">₹1,299.00</p>
                    </div>
                </div>

                {/* Method Tabs */}
                <div className="flex border-b border-gray-200">
                    <button 
                        onClick={() => setMethod('upi')}
                        className={`flex-1 py-4 font-medium text-sm flex justify-center items-center gap-2 transition-colors
                            ${method === 'upi' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <FaMobileAlt className="text-lg" /> UPI Options
                    </button>
                    <button 
                        onClick={() => setMethod('bank')}
                        className={`flex-1 py-4 font-medium text-sm flex justify-center items-center gap-2 transition-colors
                            ${method === 'bank' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <FaUniversity className="text-lg" /> Net Banking
                    </button>
                </div>

                {/* Body Content */}
                <div className="px-8 py-6 min-h-[300px]">
                    
                    {/* === UPI SECTION === */}
                    {method === 'upi' && (
                        <div className="space-y-6">
                            <p className="text-sm text-gray-600">Select an app or enter ID:</p>
                            
                            {/* Quick App Selection */}
                            <div className="grid grid-cols-3 gap-3">
                                <button className="flex flex-col items-center justify-center p-3 border rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                                    <FaGoogle className="text-2xl text-red-500 mb-1" />
                                    <span className="text-xs font-medium">GPay</span>
                                </button>
                                <button className="flex flex-col items-center justify-center p-3 border rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                                    <FaMobileAlt className="text-2xl text-blue-600 mb-1" />
                                    <span className="text-xs font-medium">PhonePe</span>
                                </button>
                                <button className="flex flex-col items-center justify-center p-3 border rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                                    <FaQrcode className="text-2xl text-gray-700 mb-1" />
                                    <span className="text-xs font-medium">Scan QR</span>
                                </button>
                            </div>

                            <div className="relative flex py-2 items-center">
                                <div className="flex-grow border-t border-gray-300"></div>
                                <span className="flex-shrink-0 mx-4 text-gray-400 text-xs">OR ENTER UPI ID</span>
                                <div className="flex-grow border-t border-gray-300"></div>
                            </div>

                            {/* UPI Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                                        placeholder="example@okaxis"
                                    />
                                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700">
                                        Verify
                                    </button>
                                </div>
                                <p className="text-xs text-green-600 mt-2 hidden flex items-center gap-1">
                                    <FaCheckCircle /> Verified Name: John Doe
                                </p>
                            </div>
                        </div>
                    )}

                    {/* === NET BANKING SECTION === */}
                    {method === 'bank' && (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">Popular Banks:</p>
                            
                            <div className="space-y-2">
                                {['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank'].map((bank) => (
                                    <div 
                                        key={bank}
                                        onClick={() => setSelectedBank(bank)}
                                        className={`flex justify-between items-center p-3 border rounded-lg cursor-pointer transition-all
                                            ${selectedBank === bank ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-500' : 'hover:border-gray-400'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="bg-gray-200 p-2 rounded-full text-gray-600">
                                                <FaUniversity size={14} />
                                            </div>
                                            <span className="font-medium text-gray-700">{bank}</span>
                                        </div>
                                        {selectedBank === bank && <FaCheckCircle className="text-indigo-600" />}
                                    </div>
                                ))}
                            </div>

                            <div className="pt-2">
                                <select className="w-full p-3 border border-gray-300 rounded-lg text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                    <option>Select other bank</option>
                                    <option>Kotak Mahindra</option>
                                    <option>Punjab National Bank</option>
                                    <option>Bank of Baroda</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Action */}
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow transition-colors flex justify-center items-center gap-2">
                        Pay ₹1,299.00 <FaChevronRight size={14} />
                    </button>
                </div>

            </div>
        </div>
    )
}