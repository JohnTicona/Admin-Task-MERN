import React from 'react'
import { Link } from 'react-router-dom'

export const PreviewProject = ({ project }) => {
  const { name, _id, client } = project
  return (
    <div className='border-b p-5 flex'>
      <p className='flex-1'>{name}
        <span className='text-sm text-gray-500 upp
        '
        >{' '} {client}
        </span>
      </p>

      <Link to={`${_id}`} className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold'>Ver proyecto</Link>
    </div>
  )
}
