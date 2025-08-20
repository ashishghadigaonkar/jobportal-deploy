import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Sparkles, TrendingUp, Users } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='relative min-h-screen flex items-center justify-center overflow-hidden'>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-10 opacity-50">
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
                    <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '2s'}}></div>
                    <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '4s'}}></div>
                </div>
            </div>

            <div className='relative z-10 text-center max-w-6xl mx-auto px-4'>
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='flex flex-col gap-8'
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className='mx-auto'
                    >
                        <span className='glass-nav text-white font-medium text-sm flex items-center gap-2 animate-pulse-glow'>
                            <Sparkles className="w-4 h-4" />
                            #1 Modern Job Portal Platform
                            <TrendingUp className="w-4 h-4" />
                        </span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className='text-6xl md:text-7xl lg:text-8xl font-bold font-poppins leading-tight'
                    >
                        Find Your <br />
                        <span className='gradient-text'>Dream Career</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className='text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed'
                    >
                        Discover thousands of opportunities with top companies worldwide. 
                        Your next career breakthrough is just a search away.
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className='flex justify-center'
                    >
                        <div className='glass-card flex w-full max-w-2xl items-center gap-4 p-2'>
                            <input
                                type="text"
                                placeholder='Search jobs, companies, or skills...'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className='flex-1 bg-transparent text-white placeholder-white/70 outline-none text-lg px-4 py-2'
                                onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                            />
                            <Button 
                                onClick={searchJobHandler} 
                                className="btn-gradient text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition-all duration-300"
                            >
                                <Search className='h-5 w-5' />
                                Search Jobs
                            </Button>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className='flex flex-wrap justify-center gap-8 mt-8'
                    >
                        <div className='glass rounded-2xl px-6 py-4 text-center'>
                            <div className='text-2xl font-bold text-white'>10K+</div>
                            <div className='text-white/70'>Active Jobs</div>
                        </div>
                        <div className='glass rounded-2xl px-6 py-4 text-center'>
                            <div className='text-2xl font-bold text-white'>5K+</div>
                            <div className='text-white/70'>Companies</div>
                        </div>
                        <div className='glass rounded-2xl px-6 py-4 text-center'>
                            <div className='text-2xl font-bold text-white'>50K+</div>
                            <div className='text-white/70'>Job Seekers</div>
                        </div>
                        <div className='glass rounded-2xl px-6 py-4 text-center'>
                            <div className='text-2xl font-bold text-white'>95%</div>
                            <div className='text-white/70'>Success Rate</div>
                        </div>
                    </motion.div>

                    {/* Call to Action */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        className='flex flex-col sm:flex-row gap-4 justify-center items-center mt-8'
                    >
                        <Button className="btn-secondary text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition-all duration-300">
                            <Users className='h-5 w-5' />
                            Join as Job Seeker
                        </Button>
                        <Button variant="outline" className="glass-card text-white border-white/30 hover:bg-white/10 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300">
                            Post a Job
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white rounded-full animate-bounce mt-2"></div>
                </div>
            </motion.div>
        </div>
    )
}

export default HeroSection