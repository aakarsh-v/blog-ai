import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const UserDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: []
    })

    const { axios, setToken, setIsAdmin } = useAppContext();
    const navigate = useNavigate();

    const fetchDashboard = async() => {
        try {
            const {data} = await axios.get('/api/auth/dashboard')
            if (data.success) {
                setDashboardData(data.dashboardData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        axios.defaults.headers.common['Authorization'] = null;
        setToken(null);
        setIsAdmin(false);
        navigate('/');
    }

    useEffect(() => {
        fetchDashboard();
    }, [])

    return (
        <div className='min-h-screen bg-blue-50/50'>
            {/* Header */}
            <div className='flex items-center justify-between py-4 px-6 sm:px-12 border-b border-gray-200 bg-white'>
                <img src={assets.logo} className='w-32 sm:w-40 cursor-pointer' 
                onClick={()=> navigate('/')} alt="" />
                <div className='flex items-center gap-4'>
                    <button onClick={() => navigate('/')} className='text-sm px-6 py-2 bg-gray-100 text-gray-700 rounded-full cursor-pointer hover:bg-gray-200 transition-all'>
                        View Blog
                    </button>
                    <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90 transition-all'>
                        Logout
                    </button>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className='p-4 md:p-10'>
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-2'>My Dashboard</h1>
                    <p className='text-gray-600'>Manage your blogs and track your activity</p>
                </div>

                {/* Stats Cards */}
                <div className='flex flex-wrap gap-4 mb-8'>
                    <div className='flex items-center gap-4 bg-white p-6 min-w-58 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-all'>
                        <img src={assets.dashboard_icon_1} alt="" />
                        <div>
                            <p className='text-2xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
                            <p className='text-gray-400 font-light'>My Blogs</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-4 bg-white p-6 min-w-58 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-all'>
                        <img src={assets.dashboard_icon_2} alt="" />
                        <div>
                            <p className='text-2xl font-semibold text-gray-600'>{dashboardData.comments}</p>
                            <p className='text-gray-400 font-light'>My Comments</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-4 bg-white p-6 min-w-58 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-all'>
                        <img src={assets.dashboard_icon_3} alt="" />
                        <div>
                            <p className='text-2xl font-semibold text-gray-600'>{dashboardData.drafts}</p>
                            <p className='text-gray-400 font-light'>Drafts</p>
                        </div>
                    </div>
                </div>

                {/* Recent Blogs Table */}
                <div className='bg-white rounded-lg shadow-md'>
                    <div className='flex items-center gap-3 p-6 border-b border-gray-200'>
                        <img src={assets.dashboard_icon_4} alt="" />
                        <p className='text-lg font-semibold text-gray-700'>My Recent Blogs</p>
                    </div>

                    <div className='overflow-x-auto'>
                        <table className='w-full text-sm text-gray-500'>
                            <thead className='text-xs text-gray-600 text-left uppercase bg-gray-50'>
                                <tr>
                                    <th scope='col' className='px-6 py-4'>#</th>
                                    <th scope='col' className='px-6 py-4'>Blog Title</th>
                                    <th scope='col' className='px-6 py-4 max-sm:hidden'>Date</th>
                                    <th scope='col' className='px-6 py-4 max-sm:hidden'>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dashboardData.recentBlogs.length > 0 ? (
                                    dashboardData.recentBlogs.map((blog, index) => (
                                        <tr key={blog._id} className='border-b border-gray-100 hover:bg-gray-50'>
                                            <td className='px-6 py-4'>{index + 1}</td>
                                            <td className='px-6 py-4 font-medium text-gray-700'>{blog.title}</td>
                                            <td className='px-6 py-4 max-sm:hidden'>
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className='px-6 py-4 max-sm:hidden'>
                                                <span className={`px-3 py-1 rounded-full text-xs ${
                                                    blog.isPublished 
                                                        ? 'bg-green-100 text-green-600' 
                                                        : 'bg-yellow-100 text-yellow-600'
                                                }`}>
                                                    {blog.isPublished ? 'Published' : 'Draft'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className='px-6 py-8 text-center text-gray-500'>
                                            No blogs found. Start writing your first blog!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className='mt-8 bg-white rounded-lg shadow-md p-6'>
                    <h3 className='text-lg font-semibold text-gray-700 mb-4'>Quick Actions</h3>
                    <div className='flex flex-wrap gap-4'>
                        <button 
                            onClick={() => navigate('/admin/addBlog')}
                            className='flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90 transition-all'
                        >
                            <img src={assets.add_icon} alt="" className='w-5' />
                            Write New Blog
                        </button>
                        <button 
                            onClick={() => navigate('/admin/listBlog')}
                            className='flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-all'
                        >
                            <img src={assets.list_icon} alt="" className='w-5' />
                            View All My Blogs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard 