import React from 'react'
import { Button } from './ui/button'
import { Bookmark, Building2, MapPin, Clock, DollarSign, Users, ExternalLink } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <motion.div
            whileHover={{ 
                y: -8,
                scale: 1.02
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className='glass-card cursor-pointer group relative overflow-hidden'
        >
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className='relative z-10'>
                {/* Header with Date and Bookmark */}
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-2 text-white/60 text-sm'>
                        <Clock className='w-3 h-3' />
                        <span>
                            {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                        </span>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300 text-white/70 hover:text-white"
                    >
                        <Bookmark className='w-4 h-4' />
                    </motion.button>
                </div>

                {/* Company Info */}
                <div className='flex items-center gap-3 mb-4'>
                    <div className="relative">
                        <Avatar className="w-12 h-12 ring-2 ring-white/20 group-hover:ring-purple-400/50 transition-all duration-300">
                            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-2 border-white/20"></div>
                    </div>
                    <div>
                        <h3 className='font-semibold text-lg text-white group-hover:text-purple-300 transition-colors duration-300'>
                            {job?.company?.name}
                        </h3>
                        <p className='text-sm text-white/70 flex items-center gap-1'>
                            <MapPin className='w-3 h-3' />
                            {job?.location || 'Remote'}
                        </p>
                    </div>
                </div>

                {/* Job Title */}
                <h2 className='font-bold text-xl text-white mb-3 group-hover:text-purple-300 transition-colors duration-300 line-clamp-2'>
                    {job?.title}
                </h2>

                {/* Job Description */}
                <p className='text-white/80 text-sm mb-4 line-clamp-3 leading-relaxed'>
                    {job?.description}
                </p>

                {/* Job Details Badges */}
                <div className='flex flex-wrap gap-2 mb-6'>
                    <Badge className='bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-white border-blue-300/30 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 flex items-center gap-1'>
                        <Users className='w-3 h-3' />
                        {job?.position} Positions
                    </Badge>
                    <Badge className='bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border-purple-300/30 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 flex items-center gap-1'>
                        <Clock className='w-3 h-3' />
                        {job?.jobType}
                    </Badge>
                    <Badge className='bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-white border-green-300/30 hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300 flex items-center gap-1'>
                        <DollarSign className='w-3 h-3' />
                        {job?.salary} LPA
                    </Badge>
                </div>

                {/* Action Buttons */}
                <div className='flex gap-3'>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1"
                    >
                        <Button
                            onClick={() => navigate(`/description/${job?._id}`)}
                            variant="outline"
                            className="w-full glass text-white border-white/30 hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 flex items-center gap-2"
                        >
                            View Details
                            <ExternalLink className='w-4 h-4' />
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1"
                    >
                        <Button className="w-full btn-gradient text-white hover:scale-[1.02] transition-all duration-300">
                            Apply Now
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-blue-400"></div>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-purple-400 to-blue-400"></div>
                <div className="absolute right-0 top-0 w-0.5 h-full bg-gradient-to-b from-blue-400 to-purple-400"></div>
            </div>
        </motion.div>
    )
}

export default Job