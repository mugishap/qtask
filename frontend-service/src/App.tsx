import { motion } from 'framer-motion'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Pages from './Pages'
import { Logo } from './assets'

const App: React.FC = () => {

  return (
    <React.Suspense
      fallback={
        <div className='w-full bg-slate-200 h-screen flex justify-center items-center'>
          <div className='flex flex-col items-center justify-center'>
            <div className='relative z-[2] h-44 w-44'>
              <div className='z-[3] animate-spin absolute w-full h-full rounded-full border-b-2 border-primary-blue p-10'>
              </div>
              <div className='z-[4] absolute w-full h-full flex items-center justify-center'>
                <img className='w-32' src={Logo} alt="Logo" />
              </div>
            </div>
            <span className='font-bold text-2xl mt-4'>Loading...</span>
          </div>
        </div>
      }
    >
      <motion.div initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }} className="">
        <ToastContainer
          theme='colored'
          position='top-right'
          hideProgressBar={true}
        />
        <Pages />
      </motion.div>
    </React.Suspense>
  )
}

export default App