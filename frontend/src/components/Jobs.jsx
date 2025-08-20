import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Search, Filter, Briefcase } from 'lucide-react';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

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

    return (
        <div className='min-h-screen'>
            <Navbar />
            
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='pt-24 pb-8'
            >
                <div className='max-w-7xl mx-auto px-4'>
                    <div className='text-center mb-8'>
                        <h1 className='text-4xl md:text-5xl font-bold font-poppins text-white mb-4'>
                            Find Your <span className='gradient-text'>Perfect Job</span>
                        </h1>
                        <p className='text-white/80 text-lg max-w-2xl mx-auto'>
                            {searchedQuery ? 
                                `Showing results for "${searchedQuery}"` : 
                                'Browse through thousands of job opportunities from top companies'
                            }
                        </p>
                        
                        {/* Job Count */}
                        <div className='flex justify-center mt-6'>
                            <div className='glass-nav text-white font-medium text-sm flex items-center gap-2'>
                                <Briefcase className="w-4 h-4" />
                                {filterJobs.length} Jobs Available
                                <Filter className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className='max-w-7xl mx-auto px-4 pb-20'>
                <div className='flex gap-8'>
                    {/* Filter Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className='w-80 flex-shrink-0'
                    >
                        <div className='sticky top-24'>
                            <FilterCard />
                        </div>
                    </motion.div>

                    {/* Jobs Grid */}
                    <div className='flex-1'>
                        {filterJobs.length <= 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                className='flex flex-col items-center justify-center py-20'
                            >
                                <div className='glass-card text-center p-12 max-w-md mx-auto'>
                                    <div className='w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                                        <Search className='w-10 h-10 text-white' />
                                    </div>
                                    <h3 className='text-2xl font-bold text-white mb-4'>No Jobs Found</h3>
                                    <p className='text-white/70 mb-6'>
                                        {searchedQuery ? 
                                            `No jobs match your search for "${searchedQuery}". Try different keywords or browse all jobs.` :
                                            'No jobs are currently available. Please check back later!'
                                        }
                                    </p>
                                    {searchedQuery && (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => window.location.href = '/jobs'}
                                            className='btn-gradient text-white px-6 py-3 rounded-xl font-medium'
                                        >
                                            Browse All Jobs
                                        </motion.button>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'
                            >
                                {filterJobs.map((job, index) => (
                                    <motion.div
                                        key={job?._id}
                                        variants={{
                                            hidden: { opacity: 0, y: 50 },
                                            visible: { 
                                                opacity: 1, 
                                                y: 0,
                                                transition: { 
                                                    duration: 0.6, 
                                                    ease: "easeOut",
                                                    delay: index * 0.05
                                                }
                                            }
                                        }}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs