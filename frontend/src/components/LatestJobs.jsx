import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, Star } from 'lucide-react';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const headingVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    }

    return (
        <div className='max-w-7xl mx-auto my-20 px-4'>
            <motion.div
                variants={headingVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className='text-center mb-12'
            >
                {/* Section Badge */}
                <div className='flex justify-center mb-6'>
                    <div className='glass-nav text-white font-medium text-sm flex items-center gap-2'>
                        <TrendingUp className="w-4 h-4" />
                        Latest Opportunities
                        <Star className="w-4 h-4 text-yellow-400" />
                    </div>
                </div>

                {/* Main Heading */}
                <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-white mb-4'>
                    <span className='gradient-text'>Latest & Top</span>
                    <br />
                    Job Openings
                </h1>

                {/* Subtitle */}
                <p className='text-white/80 text-lg max-w-2xl mx-auto'>
                    Discover the most recent job opportunities from leading companies worldwide. 
                    Your dream job awaits!
                </p>
            </motion.div>

            {/* Jobs Grid */}
            {allJobs.length <= 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className='flex flex-col items-center justify-center py-20'
                >
                    <div className='glass-card text-center p-12 max-w-md'>
                        <div className='w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                            <Briefcase className='w-10 h-10 text-white' />
                        </div>
                        <h3 className='text-2xl font-bold text-white mb-4'>No Jobs Available</h3>
                        <p className='text-white/70'>
                            We're currently updating our job listings. Please check back soon for new opportunities!
                        </p>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                >
                    {allJobs?.slice(0, 6).map((job, index) => (
                        <motion.div
                            key={job._id}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { 
                                    opacity: 1, 
                                    y: 0,
                                    transition: { 
                                        duration: 0.6, 
                                        ease: "easeOut",
                                        delay: index * 0.1 
                                    }
                                }
                            }}
                        >
                            <LatestJobCards job={job} />
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* View All Jobs Button */}
            {allJobs.length > 6 && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className='text-center mt-12'
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='btn-secondary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300'
                        onClick={() => window.location.href = '/jobs'}
                    >
                        View All {allJobs.length} Jobs
                    </motion.button>
                </motion.div>
            )}
        </div>
    )
}

export default LatestJobs