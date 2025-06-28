# Dashboard System Setup

## Overview
The application now supports two types of dashboards:
1. **Admin Dashboard** - Shows all blogs and comments from all users
2. **User Dashboard** - Shows only the logged-in user's blogs and comments

## How It Works

### Authentication Flow
1. **Admin Login**: Uses `/api/admin/login` endpoint
   - JWT token contains only `email` field
   - Redirects to `/admin` dashboard
   - Shows all blogs and comments

2. **User Login**: Uses `/api/auth/login` endpoint
   - JWT token contains both `email` and `_id` fields
   - Redirects to `/dashboard` (user dashboard)
   - Shows only user's own blogs and comments

### Frontend Implementation

#### AppContext Changes
- Added `isAdmin` state to track user type
- Added `checkIfAdmin()` function that decodes JWT to determine if user is admin
- Admin tokens only have `email`, user tokens have both `email` and `_id`

#### Routing Logic
- `/admin` route: Only accessible if `token && isAdmin`
- `/dashboard` route: Only accessible if `token && !isAdmin`
- Navbar button changes based on user type

#### Components
- **UserDashboard**: New component for regular users
  - Shows user's blog statistics
  - Displays recent blogs table
  - Quick actions to write new blog or view all blogs
  - Uses `/api/auth/dashboard` endpoint

- **Admin Dashboard**: Existing component for admins
  - Shows all blogs and comments
  - Uses `/api/admin/dashboard` endpoint

### Backend Endpoints

#### Admin Endpoints (`/api/admin/`)
- `GET /dashboard` - Returns all blogs, comments, and statistics
- `GET /blogs` - Returns all blogs
- `GET /comments` - Returns all comments

#### User Endpoints (`/api/auth/`)
- `GET /dashboard` - Returns only user's blogs, comments, and statistics
- `GET /blogs` - Returns only user's blogs
- `GET /comments` - Returns only user's comments

### Key Features

1. **Automatic User Type Detection**: Frontend automatically detects if user is admin based on JWT token structure
2. **Proper Access Control**: Users can only access their own data, admins can access all data
3. **Seamless Navigation**: Navbar and routing automatically adapt based on user type
4. **Consistent UI**: Both dashboards use similar design patterns for consistency

### Testing

To test the system:

1. **Admin Login**:
   - Use admin credentials (set in environment variables)
   - Should redirect to `/admin` dashboard
   - Should show all blogs and comments

2. **User Login**:
   - Use regular user credentials
   - Should redirect to `/dashboard` (user dashboard)
   - Should show only user's own blogs and comments

3. **Navigation**:
   - Navbar button should show "Admin Dashboard" for admins
   - Navbar button should show "My Dashboard" for regular users
   - Clicking should navigate to appropriate dashboard

### Environment Variables Required

Make sure these are set in your `.env` file:
```
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret
```

## Files Modified/Created

### New Files
- `frontend/src/pages/UserDashboard.jsx` - User dashboard component

### Modified Files
- `frontend/context/AppContext.jsx` - Added admin detection logic
- `frontend/src/App.jsx` - Updated routing logic
- `frontend/src/pages/Login.jsx` - Fixed token field and added admin state
- `frontend/src/components/admin/Login.jsx` - Added navigation and admin state
- `frontend/src/components/Navbar.jsx` - Updated button logic
- `frontend/src/pages/admin/Layout.jsx` - Updated logout function
- `frontend/src/pages/UserDashboard.jsx` - Updated logout function

### Dependencies Added
- `jwt-decode` - For decoding JWT tokens in frontend 