import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'
import AdminLogin from './components/admin/Login'
import UserLogin from './pages/Login'
import Signup from './pages/Signup'
import UserDashboard from './pages/UserDashboard'
import UserLayout from './pages/user/Layout'
import UserDashboardPage from './pages/user/Dashboard'
import UserAddBlog from './pages/user/AddBlog'
import UserListBlog from './pages/user/ListBlog'
import UserComments from './pages/user/Comments'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

const App = () => {

  const {token, isAdmin} = useAppContext();
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/admin' element = {token && isAdmin ? <Layout/> : <AdminLogin/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='addBlog' element={<AddBlog/>}/>
          <Route path='listBlog' element={<ListBlog/>}/>
          <Route path='comments' element={<Comments/>}/>
        </Route>
        <Route path='/user' element = {token && !isAdmin ? <UserLayout/> : <UserLogin/>}>
          <Route index element={<UserDashboardPage/>}/>
          <Route path='addBlog' element={<UserAddBlog/>}/>
          <Route path='listBlog' element={<UserListBlog/>}/>
          <Route path='comments' element={<UserComments/>}/>
        </Route>
        <Route path='/dashboard' element = {token && !isAdmin ? <UserDashboard/> : <UserLogin/>}/>
      </Routes>
    </div>
  )
}

export default App
