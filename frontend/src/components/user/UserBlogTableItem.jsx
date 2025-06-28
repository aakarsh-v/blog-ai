import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';

const UserBlogTableItem = ({blog, fetchBlogs, index}) => {
    
    const {title, createdAt, _id, isPublished} = blog;
    const blogDate = new Date(createdAt);

    const {axios} = useAppContext();

    const togglePublish = async() => {
      try {
        const {data} = await axios.post('/api/blog/toggle-publish', {id: _id})
        if(data.success){
          toast.success(data.message)
          await fetchBlogs()
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    const deleteBlog = async() => {
      try {
        const confirm = window.confirm("Do you want to delete this blog?")
        if(!confirm) return;

        const {data} = await axios.post('/api/blog/delete', {id: _id})
        if(data.success){
          toast.success(data.message)
          await fetchBlogs()
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

  return (
    <tr className='border-b border-gray-300'>
      <td className='px-2 py-4 xl:px-6'>{index}</td>
      <td className='px-2 py-4'>{title}</td>
      <td className='px-2 py-4 max-sm:hidden'>{blogDate.toLocaleDateString()}</td>
      <td className='px-2 py-4 max-sm:hidden'>
        <span className={`px-3 py-1 rounded-full text-xs ${
          isPublished ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
        }`}>
          {isPublished ? 'Published' : 'Draft'}
        </span>
      </td>
      <td className='px-2 py-4'>
        <div className='inline-flex items-center gap-4'>
            <img onClick={togglePublish} src={assets.tick_icon} className='w-5 hover:scale-110
            transition-all cursor-pointer' alt="toggle publish"/>
            <img onClick={deleteBlog} src={assets.bin_icon} alt="delete" className='w-5 hover:scale-110
            transition-all cursor-pointer'/>
        </div>
      </td>
    </tr>
  )
}

export default UserBlogTableItem 