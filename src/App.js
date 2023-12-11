import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupComponent from './pages/signup/signup';
import SigninComponent from './pages/signin/signin';
import { AdminProductedRoute } from './modules/admin/protected-route/admin-protected-route';
import AdminDashboard from './modules/admin/admin-dashboard/admin-dashbaord';
import CreatorDashboard from './modules/creators/creators-dashboard/creators-dashboard';
import { CreatorProductedRoute } from './modules/creators/protected-route/creator-protected-route';
import CreatContentComponent from './modules/creators/create-content/create-content';
import ContentListComponent from './modules/creators/content-list/content-list';
import ViewerDashboard from './modules/viewers/viewer-dashboard/viewer-dashboard';
import { ViewerProductedRoute } from './modules/viewers/protected-route/viewer-protected-route';
import EditContentComponent from './modules/creators/edit-content/edit-content';
import EditUserComponent from './modules/admin/edit-user/edit-user';
import ViewerVideoDetail from './modules/viewers/viewer-video-detail/view-video-detail';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/signin" element={<SigninComponent />} />
          <Route element={<AdminProductedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/user/edit/:id" element={<EditUserComponent />} />
          </Route>
          <Route element={<CreatorProductedRoute />}>
            <Route path="/creator/dashboard" element={<CreatorDashboard />} />
            <Route path="/creator/create-content" element={<CreatContentComponent />} />
            <Route path="/creator/content-list" element={<ContentListComponent />} />
            <Route path="/creator/create-content/:id" element={<EditContentComponent />} />

          </Route>
          <Route element={<ViewerProductedRoute />}>
            <Route path="/home" element={<ViewerDashboard />} />
            <Route path="/video/:id" element={<ViewerVideoDetail />} />
          </Route>
          <Route path="/" element={<Navigate to="/signin" />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
