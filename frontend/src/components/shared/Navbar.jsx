import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X, Briefcase } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const navVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    }

    const mobileMenuVariants = {
        closed: { 
            opacity: 0,
            height: 0,
            transition: { duration: 0.3 }
        },
        open: { 
            opacity: 1,
            height: "auto",
            transition: { duration: 0.3 }
        }
    }

    return (
        <motion.nav 
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className='fixed top-0 left-0 right-0 z-50 p-4'
        >
            <div className='glass-nav mx-auto max-w-7xl flex items-center justify-between'>
                {/* Logo */}
                <Link to="/" className='flex items-center gap-2 group'>
                    <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 group-hover:scale-110 transition-transform duration-300">
                        <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <span className='text-2xl font-bold font-poppins text-white'>
                        Career<span className='gradient-text-secondary'>Hub</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-6'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link 
                                        to="/admin/companies" 
                                        className='text-white/90 hover:text-white transition-colors duration-300 relative group'
                                    >
                                        Companies
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/admin/jobs" 
                                        className='text-white/90 hover:text-white transition-colors duration-300 relative group'
                                    >
                                        Jobs
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link 
                                        to="/" 
                                        className='text-white/90 hover:text-white transition-colors duration-300 relative group'
                                    >
                                        Home
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/jobs" 
                                        className='text-white/90 hover:text-white transition-colors duration-300 relative group'
                                    >
                                        Jobs
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/browse" 
                                        className='text-white/90 hover:text-white transition-colors duration-300 relative group'
                                    >
                                        Browse
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Auth Section */}
                    {!user ? (
                        <div className='flex items-center gap-3'>
                            <Link to="/login">
                                <Button 
                                    variant="outline" 
                                    className="glass text-white border-white/30 hover:bg-white/10 hover:scale-105 transition-all duration-300"
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="btn-gradient text-white hover:scale-105 transition-all duration-300">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Avatar className="cursor-pointer ring-2 ring-white/30 hover:ring-white/60 transition-all duration-300">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                                    </Avatar>
                                </motion.div>
                            </PopoverTrigger>
                            <PopoverContent className="glass-card border-white/20 w-80">
                                <div className='text-white'>
                                    <div className='flex gap-3 items-center space-y-2'>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-semibold text-lg'>{user?.fullname}</h4>
                                            <p className='text-sm text-white/70'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-4 gap-2'>
                                        {user && user.role === 'student' && (
                                            <Link to="/profile">
                                                <Button 
                                                    variant="ghost" 
                                                    className='w-full justify-start text-white hover:bg-white/10 hover:scale-105 transition-all duration-300'
                                                >
                                                    <User2 className="w-4 h-4 mr-2" />
                                                    View Profile
                                                </Button>
                                            </Link>
                                        )}
                                        <Button 
                                            onClick={logoutHandler} 
                                            variant="ghost"
                                            className='w-full justify-start text-white hover:bg-red-500/20 hover:scale-105 transition-all duration-300'
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className='md:hidden'>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-white hover:bg-white/10"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        variants={mobileMenuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="md:hidden mt-4 glass-card mx-4 overflow-hidden"
                    >
                        <div className="flex flex-col space-y-4 p-4">
                            {user && user.role === 'recruiter' ? (
                                <>
                                    <Link 
                                        to="/admin/companies" 
                                        className='text-white py-2 hover:text-purple-300 transition-colors'
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Companies
                                    </Link>
                                    <Link 
                                        to="/admin/jobs" 
                                        className='text-white py-2 hover:text-purple-300 transition-colors'
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Jobs
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link 
                                        to="/" 
                                        className='text-white py-2 hover:text-purple-300 transition-colors'
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Home
                                    </Link>
                                    <Link 
                                        to="/jobs" 
                                        className='text-white py-2 hover:text-purple-300 transition-colors'
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Jobs
                                    </Link>
                                    <Link 
                                        to="/browse" 
                                        className='text-white py-2 hover:text-purple-300 transition-colors'
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Browse
                                    </Link>
                                </>
                            )}
                            
                            {!user && (
                                <div className='flex flex-col space-y-2 pt-4 border-t border-white/20'>
                                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button variant="outline" className="w-full glass text-white border-white/30">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button className="w-full btn-gradient text-white">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

export default Navbar