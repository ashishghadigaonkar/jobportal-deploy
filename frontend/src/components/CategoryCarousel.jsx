import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from 'framer-motion'
import { 
    Code, 
    Paintbrush, 
    TrendingUp, 
    Stethoscope, 
    GraduationCap, 
    Building, 
    Cpu, 
    Camera,
    Megaphone,
    Calculator
} from 'lucide-react'

const category = [
    { name: "Frontend Developer", icon: Code },
    { name: "Backend Developer", icon: Cpu },
    { name: "Data Science", icon: TrendingUp },
    { name: "Graphic Designer", icon: Paintbrush },
    { name: "FullStack Developer", icon: Code },
    { name: "Healthcare", icon: Stethoscope },
    { name: "Education", icon: GraduationCap },
    { name: "Architecture", icon: Building },
    { name: "Photography", icon: Camera },
    { name: "Marketing", icon: Megaphone },
    { name: "Finance", icon: Calculator }
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

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
                <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-white mb-4'>
                    Browse by <span className='gradient-text-secondary'>Category</span>
                </h2>
                <p className='text-white/80 text-lg max-w-2xl mx-auto'>
                    Explore opportunities across various industries and find your perfect career match
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                <Carousel className="w-full max-w-6xl mx-auto">
                    <CarouselContent className="-ml-2">
                        {category.map((cat, index) => {
                            const IconComponent = cat.icon;
                            return (
                                <CarouselItem key={index} className="pl-2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                    <motion.div
                                        whileHover={{ 
                                            scale: 1.05,
                                            y: -5
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Button
                                            onClick={() => searchJobHandler(cat.name)}
                                            variant="outline"
                                            className="glass-card w-full h-32 flex flex-col items-center justify-center gap-3 text-white border-white/20 hover:border-purple-400/50 hover:bg-white/10 transition-all duration-300 group"
                                        >
                                            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                                                <IconComponent className="w-6 h-6 text-white group-hover:text-purple-300 transition-colors duration-300" />
                                            </div>
                                            <span className="font-medium text-sm text-center group-hover:text-purple-300 transition-colors duration-300">
                                                {cat.name}
                                            </span>
                                        </Button>
                                    </motion.div>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                    <CarouselPrevious className="glass text-white border-white/20 hover:bg-white/10 hover:scale-110 transition-all duration-300" />
                    <CarouselNext className="glass text-white border-white/20 hover:bg-white/10 hover:scale-110 transition-all duration-300" />
                </Carousel>
            </motion.div>
        </div>
    )
}

export default CategoryCarousel