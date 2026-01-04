import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';

// UI Components
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';

const RegisterPage: React.FC = () => {
    // Assuming useAuth provides registration logic and loading/error states
    const { register, isLoading, error } = useAuth(); 

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dobDay, setDobDay] = useState('');
    const [dobMonth, setDobMonth] = useState('');
    const [dobYear, setDobYear] = useState('');
    const [gender, setGender] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        // Simple client-side validation
        if (!firstName || !lastName || !email || !password || !dobDay || !dobMonth || !dobYear || !gender) {
            setLocalError("Please fill out all required fields.");
            return;
        }

        const dateOfBirth = `${dobYear}-${dobMonth.padStart(2, '0')}-${dobDay.padStart(2, '0')}`;
        
        try {
            // Mock registration call using context/hook
            // await register({ firstName, lastName, email, password, dateOfBirth, gender });
            console.log("Registration data submitted:", { firstName, lastName, email, password, dateOfBirth, gender });
            // In a real app, this would redirect on success
        } catch (err) {
            // Error handling is often managed inside the useAuth hook, but catching locally just in case.
        }

    }, [firstName, lastName, email, password, dobDay, dobMonth, dobYear, gender /*, register */]);

    // Helper data for DOB selects
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i).reverse(); // Oldest first

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white p-6 md:p-10 rounded-lg shadow-xl">
                
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Create a New Account</h1>
                    <p className="text-gray-500 mt-1 text-lg">It's quick and easy.</p>
                </div>

                {/* Error Display */}
                {(error || localError) && (
                    <div className="p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                        {localError || `Registration failed: ${error}`}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Name Fields */}
                    <div className="flex space-x-2">
                        <Input
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <Input
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <Input
                        type="email"
                        placeholder="Mobile number or email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {/* Password Input */}
                    <Input
                        type="password"
                        placeholder="New password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {/* Date of Birth Section */}
                    <div className="space-y-1">
                        <div className="flex items-center text-sm font-medium text-gray-600">
                            Date of birth
                            <HelpCircle className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {/* Month */}
                            <select 
                                value={dobMonth} 
                                onChange={(e) => setDobMonth(e.target.value)} 
                                className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>Month</option>
                                {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                            </select>

                            {/* Day */}
                            <select 
                                value={dobDay} 
                                onChange={(e) => setDobDay(e.target.value)} 
                                className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>Day</option>
                                {days.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                            
                            {/* Year */}
                            <select 
                                value={dobYear} 
                                onChange={(e) => setDobYear(e.target.value)} 
                                className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>Year</option>
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Gender Section */}
                    <div className="space-y-1">
                        <div className="flex items-center text-sm font-medium text-gray-600">
                            Gender
                            <HelpCircle className="w-3 h-3 ml-1 text-gray-400 cursor-pointer hover:text-gray-600" />
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                            
                            {/* Female */}
                            <div className={`flex items-center justify-between border rounded-md p-3 ${gender === 'Female' ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'}`}>
                                <label htmlFor="gender-female" className="w-full cursor-pointer">Female</label>
                                <input 
                                    type="radio" 
                                    id="gender-female" 
                                    name="gender" 
                                    value="Female" 
                                    checked={gender === 'Female'} 
                                    onChange={(e) => setGender(e.target.value)}
                                    className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                                />
                            </div>

                            {/* Male */}
                            <div className={`flex items-center justify-between border rounded-md p-3 ${gender === 'Male' ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'}`}>
                                <label htmlFor="gender-male" className="w-full cursor-pointer">Male</label>
                                <input 
                                    type="radio" 
                                    id="gender-male" 
                                    name="gender" 
                                    value="Male" 
                                    checked={gender === 'Male'} 
                                    onChange={(e) => setGender(e.target.value)}
                                    className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                                />
                            </div>

                            {/* Custom */}
                            <div className={`flex items-center justify-between border rounded-md p-3 ${gender === 'Custom' ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'}`}>
                                <label htmlFor="gender-custom" className="w-full cursor-pointer">Custom</label>
                                <input 
                                    type="radio" 
                                    id="gender-custom" 
                                    name="gender" 
                                    value="Custom" 
                                    checked={gender === 'Custom'} 
                                    onChange={(e) => setGender(e.target.value)}
                                    className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Terms and Policy */}
                    <p className="text-xs text-gray-500 mt-4">
                        By clicking Sign Up, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms</a>, <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and <a href="#" className="text-blue-600 hover:underline">Cookies Policy</a>.
                    </p>

                    {/* Submit Button */}
                    <div className="pt-4 flex justify-center">
                        <Button 
                            type="submit" 
                            variant="success" 
                            className="w-4/5 text-xl py-3"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing Up...' : 'Sign Up'}
                        </Button>
                    </div>

                    {/* Link to Login */}
                    <div className="text-center mt-4 pt-4 border-t border-gray-200">
                        <Link to="/login" className="text-blue-600 hover:underline font-medium text-sm">
                            Already have an account?
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default RegisterPage;