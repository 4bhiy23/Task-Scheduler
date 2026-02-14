import React from 'react'

const CreateProject = () => {
  return (
    <div>
      <form action="">
        {/* Add Fields needed for creation of project */}
        <input type="text" placeholder='Project Title' />
        <input type="text" placeholder='Start Date' />
        <input type="text" placeholder='End Date' />
        <input type="text" placeholder='Devs' />
        <input type="text" placeholder='Mile Stones' />
      </form>
    </div>
  )
}

export default CreateProject
