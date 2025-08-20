import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from 'framer-motion'
import { Filter, MapPin, Briefcase, DollarSign, X } from 'lucide-react'
import { Button } from './ui/button'

const filterData = [
    {
        filterType: "Location",
        icon: MapPin,
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        icon: Briefcase,
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        icon: DollarSign,
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    
    const clearFilters = () => {
        setSelectedValue('');
    }
    
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='glass-card sticky top-24'
        >
            {/* Header */}
            <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-3'>
                    <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500">
                        <Filter className="w-5 h-5 text-white" />
                    </div>
                    <h2 className='text-xl font-bold text-white'>Filter Jobs</h2>
                </div>
                {selectedValue && (
                    <Button
                        onClick={clearFilters}
                        variant="ghost"
                        size="sm"
                        className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-2"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                )}
            </div>

            {/* Active Filter Display */}
            {selectedValue && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-3 glass rounded-xl border border-purple-400/30"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-white text-sm">Active Filter:</span>
                        <span className="text-purple-300 font-medium">{selectedValue}</span>
                    </div>
                </motion.div>
            )}

            {/* Filter Groups */}
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                <div className="space-y-6">
                    {filterData.map((data, index) => {
                        const IconComponent = data.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="space-y-3"
                            >
                                {/* Category Header */}
                                <div className="flex items-center gap-2 pb-2 border-b border-white/20">
                                    <IconComponent className="w-4 h-4 text-purple-300" />
                                    <h3 className='font-semibold text-white'>{data.filterType}</h3>
                                </div>

                                {/* Filter Options */}
                                <div className="space-y-2">
                                    {data.array.map((item, idx) => {
                                        const itemId = `filter-${index}-${idx}`;
                                        const isSelected = selectedValue === item;
                                        
                                        return (
                                            <motion.div
                                                key={itemId}
                                                whileHover={{ x: 4 }}
                                                className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 cursor-pointer ${
                                                    isSelected 
                                                        ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30' 
                                                        : 'hover:bg-white/5'
                                                }`}
                                            >
                                                <RadioGroupItem 
                                                    value={item} 
                                                    id={itemId}
                                                    className="text-purple-400 border-white/30 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                                                />
                                                <Label 
                                                    htmlFor={itemId}
                                                    className={`cursor-pointer text-sm transition-colors duration-300 ${
                                                        isSelected ? 'text-white font-medium' : 'text-white/80 hover:text-white'
                                                    }`}
                                                >
                                                    {item}
                                                </Label>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </RadioGroup>

            {/* Additional Filter Actions */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 pt-6 border-t border-white/20"
            >
                <p className="text-white/60 text-xs text-center">
                    More filters coming soon!
                </p>
            </motion.div>
        </motion.div>
    )
}

export default FilterCard