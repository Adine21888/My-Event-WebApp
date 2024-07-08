import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const EventTable = ({ events }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>Index</th>
              <th className='border border-slate-600 rounded-md'>Event Name</th>
              <th className='border border-slate-600 rounded-md'>Organizer Name</th>
              <th className='border border-slate-600 rounded-md'>Start Date</th>
              <th className='border border-slate-600 rounded-md'>Modify</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {index + 1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {event.eventName}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {event.organizerName}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {event.startDate}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/events/details/${event._id}`}>
                      <BsInfoCircle className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/events/edit/${event._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600' />
                    </Link>
                    <Link to={`/events/delete/${event._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-600' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  )
}

export default EventTable