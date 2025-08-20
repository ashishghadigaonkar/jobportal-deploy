import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Building2, Clock, DollarSign, Users, BookmarkPlus } from 'lucide-react'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        },
        hover: {
            y: -10,
            transition: { duration: 0.3, ease: "easeOut" }
        }
    }

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            onClick={() => navigate(`/description/${job._id}`)}
            className='glass-card cursor-pointer group relative overflow-hidden'
        >
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className='relative z-10'>
                {/* Header */}
                <div className='flex items-start justify-between mb-4'>
                    <div className='flex items-center gap-3'>
                        <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center'>
                            <Building2 className='w-6 h-6 text-white' />
                        </div>
                        <div>
                            <h1 className='font-bold text-lg text-white group-hover:text-purple-300 transition-colors duration-300'>
                                {job?.company?.name}
                            </h1>
                            <p className='text-sm text-white/70 flex items-center gap-1'>
                                <MapPin className='w-3 h-3' />
                                {job?.location}
                            </p>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className='p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300'
                    >
                        <BookmarkPlus className='w-4 h-4 text-white' />
                    </motion.button>
                </div>

                {/* Job Title */}
                <h2 className='font-bold text-xl text-white mb-3 group-hover:text-purple-300 transition-colors duration-300'>
                    {job?.title}
                </h2>

                {/* Job Description */}
                <p className='text-white/80 text-sm mb-4 line-clamp-2'>
                    {job?.description}
                </p>

                {/* Job Details */}
                <div className='flex flex-wrap gap-2 mb-4'>
                    <div className='flex items-center gap-1 text-xs text-white/70 bg-white/10 rounded-full px-3 py-1'>
                        <Clock className='w-3 h-3' />
                        {job?.jobType}
                    </div>
                    <div className='flex items-center gap-1 text-xs text-white/70 bg-white/10 rounded-full px-3 py-1'>
                        <DollarSign className='w-3 h-3' />
                        {job?.salary}
                    </div>
                    <div className='flex items-center gap-1 text-xs text-white/70 bg-white/10 rounded-full px-3 py-1'>
                        <Users className='w-3 h-3' />
                        {job?.position} positions
                    </div>
                </div>

                {/* Skills/Requirements */}
                <div className='flex flex-wrap gap-2 mb-4'>
                    {job?.requirements?.slice(0, 3).map((item, index) => (
                        <Badge 
                            key={index} 
                            className='bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border-purple-300/30 hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300'
                        >
                            {item}
                        </Badge>
                    ))}
                    {job?.requirements?.length > 3 && (
                        <Badge className='bg-white/10 text-white/70 border-white/20'>
                            +{job?.requirements?.length - 3} more
                        </Badge>
                    )}
                </div>

                {/* Footer */}
                <div className='flex items-center justify-between pt-4 border-t border-white/20'>
                    <div className='text-xs text-white/60'>
                        {new Date(job?.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                        })}
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='btn-gradient text-white text-sm px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300'
                    >
                        View Details
                    </motion.button>
                </div>
            </div>

            {/* Hover Effect Lines */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-blue-400"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400"></div>
            </div>
        </motion.div>
    )
}

export default LatestJobCards