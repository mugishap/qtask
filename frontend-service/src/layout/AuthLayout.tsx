import React, { useEffect } from 'react'
import { backgrounds } from '../constants'
import { IBackground } from '../types'
import { Fade, Slide } from 'react-awesome-reveal'

interface Props {
    children: React.ReactNode
}

const AuthLayout: React.FC<Props> = ({ children }) => {

    const [currentBackground, setCurrentBackground] = React.useState<IBackground>(backgrounds[0])
    useEffect(() => {
        const interval = setInterval(() => {
            const index = backgrounds.indexOf(currentBackground)
            if (index === backgrounds.length - 1) {
                setCurrentBackground(backgrounds[0])
            }
            else {
                setCurrentBackground(backgrounds[index + 1])
            }
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className='w-full min-h-screen flex items-center'>
            <Slide direction='left' triggerOnce className='md:w-4/12 lg:w-6/12 plg:w-7/12 xl:w-8/12 hidden md:flex flex-col min-h-screen' style={{ background: `url("${currentBackground.image}")` }}>
                <div className=" bg-gradient-to-t from-black/90 via-black/50 pb-8 flex items-end justify-center to-transparent w-full min-h-screen">
                    <Fade>
                        <span className='text-white font-bold text-4xl'>{currentBackground.text}</span>
                    </Fade>
                </div>
            </Slide>
            <div className='w-full md:w-8/12 lg:w-6/12 plg:w-5/12 xl:w-4/12 flex min-h-screen pb-8 flex-col justify-between bg-white'>
                <div className='w-full'>
                    {children}
                </div>
                <div className='w-full text-lg flex flex-col items-center'>
                    <span>All Rights reserverd </span>
                    <span>QTask &copy;2023</span>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout