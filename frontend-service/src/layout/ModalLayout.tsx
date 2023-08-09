import React from 'react'

interface Props {
    children: React.ReactNode
    setViewModal: Function
}

const ModalLayout: React.FC<Props> = ({ children, setViewModal }) => {
    return (
        <div className='w-full min-h-screen absolute flex items-center justify-center top-0 left-0 bg-black/40 backdrop-blur-md z-10'>
            <div className='w-full h-full absolute z-20' onClick={() => setViewModal(false)}></div>
            <div className='w-full flex items-center justify-center'>{children}</div>
        </div>
    )
}

export default ModalLayout