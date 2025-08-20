import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2, User, Mail, Lock, Phone, Users, Eye, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])

    return (
        <div className='min-h-screen'>
            <Navbar />
            <div className='flex items-center justify-center min-h-screen px-4 pt-20'>
                {/* Background Animation */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -inset-10 opacity-30">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
                        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='relative z-10 w-full max-w-md'
                >
                    <div className='glass-card'>
                        {/* Header */}
                        <div className='text-center mb-8'>
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className='text-3xl font-bold font-poppins text-white mb-2'
                            >
                                Join CareerHub
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className='text-white/70'
                            >
                                Create your account and start your journey
                            </motion.p>
                        </div>

                        <form onSubmit={submitHandler} className='space-y-5'>
                            {/* Full Name */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                <Label className='text-white font-medium mb-2 block'>Full Name</Label>
                                <div className='relative'>
                                    <User className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60' />
                                    <Input
                                        type="text"
                                        value={input.fullname}
                                        name="fullname"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your full name"
                                        className="input-glass pl-12 py-6 text-white placeholder:text-white/60"
                                        required
                                    />
                                </div>
                            </motion.div>

                            {/* Email */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                            >
                                <Label className='text-white font-medium mb-2 block'>Email Address</Label>
                                <div className='relative'>
                                    <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60' />
                                    <Input
                                        type="email"
                                        value={input.email}
                                        name="email"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your email"
                                        className="input-glass pl-12 py-6 text-white placeholder:text-white/60"
                                        required
                                    />
                                </div>
                            </motion.div>

                            {/* Phone Number */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                            >
                                <Label className='text-white font-medium mb-2 block'>Phone Number</Label>
                                <div className='relative'>
                                    <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60' />
                                    <Input
                                        type="text"
                                        value={input.phoneNumber}
                                        name="phoneNumber"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your phone number"
                                        className="input-glass pl-12 py-6 text-white placeholder:text-white/60"
                                        required
                                    />
                                </div>
                            </motion.div>

                            {/* Password */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7, duration: 0.6 }}
                            >
                                <Label className='text-white font-medium mb-2 block'>Password</Label>
                                <div className='relative'>
                                    <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60' />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        value={input.password}
                                        name="password"
                                        onChange={changeEventHandler}
                                        placeholder="Create a strong password"
                                        className="input-glass pl-12 pr-12 py-6 text-white placeholder:text-white/60"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors'
                                    >
                                        {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                                    </button>
                                </div>
                            </motion.div>

                            {/* Role Selection */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                            >
                                <Label className='text-white font-medium mb-3 block flex items-center gap-2'>
                                    <Users className='w-4 h-4' />
                                    I am a
                                </Label>
                                <RadioGroup className="flex gap-6">
                                    <motion.div 
                                        whileHover={{ scale: 1.02 }}
                                        className="flex items-center space-x-2"
                                    >
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            id="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="w-4 h-4 text-purple-500 cursor-pointer"
                                        />
                                        <Label htmlFor="student" className="text-white cursor-pointer">Job Seeker</Label>
                                    </motion.div>
                                    <motion.div 
                                        whileHover={{ scale: 1.02 }}
                                        className="flex items-center space-x-2"
                                    >
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            id="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="w-4 h-4 text-purple-500 cursor-pointer"
                                        />
                                        <Label htmlFor="recruiter" className="text-white cursor-pointer">Recruiter</Label>
                                    </motion.div>
                                </RadioGroup>
                            </motion.div>

                            {/* Profile Photo */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.9, duration: 0.6 }}
                            >
                                <Label className='text-white font-medium mb-2 block'>Profile Photo (Optional)</Label>
                                <Input
                                    accept="image/*"
                                    type="file"
                                    onChange={changeFileHandler}
                                    className="input-glass py-6 text-white file:text-white file:bg-purple-500/20 file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 cursor-pointer"
                                />
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.6 }}
                            >
                                {loading ? (
                                    <Button 
                                        disabled 
                                        className="w-full btn-gradient py-6 text-lg font-semibold"
                                    >
                                        <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                                        Creating Account...
                                    </Button>
                                ) : (
                                    <Button 
                                        type="submit" 
                                        className="w-full btn-gradient py-6 text-lg font-semibold hover:scale-[1.02] transition-all duration-300"
                                    >
                                        Create Account
                                    </Button>
                                )}
                            </motion.div>

                            {/* Sign In Link */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1, duration: 0.6 }}
                                className="text-center text-white/70"
                            >
                                Already have an account?{' '}
                                <Link 
                                    to="/login" 
                                    className='text-white hover:text-purple-300 transition-colors font-medium'
                                >
                                    Sign In
                                </Link>
                            </motion.div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Signup