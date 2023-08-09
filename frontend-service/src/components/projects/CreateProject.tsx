import React, { useContext } from 'react'
import { CommonContext } from '../../context'
import ModalLayout from '../../layout/ModalLayout'

const CreateProject: React.FC = () => {
    const { showCreateProject, setShowCreateProject,activeProject } = useContext(CommonContext)
    return (
        <ModalLayout setViewModal={setShowCreateProject}>

        </ModalLayout>
    )
}

export default CreateProject