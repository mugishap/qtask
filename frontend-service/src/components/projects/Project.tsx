import React, { useContext } from 'react'
import ModalLayout from '../../layout/ModalLayout'
import { CommonContext } from '../../context'

const Project: React.FC = () => {
    const { setShowProject } = useContext(CommonContext)
    return (
        <ModalLayout setViewModal={setShowProject}>

        </ModalLayout>
    )
}

export default Project