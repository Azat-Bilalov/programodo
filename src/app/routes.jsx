import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { 
    SignupPage,
    LoginPage,
    UserProfilePage,
    ProductPage,
    // MainPage,
    AdminPage,
    TasksPage,
    TeamsPage,
    RoadMapPage,
    CommunityPage,
} from "@/pages";

const PrivateRoute = ({ children }) => {
    const isLoggedIn = useSelector(user => user.session.isLoggedIn);
    return isLoggedIn ? children : <Navigate to="/login" />;
};

export const Routing = () =>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<CommunityPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route
                path='/profile'
                element={
                    <PrivateRoute>
                        <UserProfilePage />
                    </PrivateRoute>
                }
            />
            <Route
                path='/products/:id'
                element={
                    <PrivateRoute>
                        <ProductPage />
                    </PrivateRoute>
                }
            />
            <Route
                path='/admin'
                element={
                    <PrivateRoute>
                        <AdminPage />
                    </PrivateRoute>
                }
            />
            <Route
                path='/tasks'
                element={
                    <PrivateRoute>
                        <TasksPage />
                    </PrivateRoute>
                }
            />
            <Route
                path='/teams'
                element={
                    <PrivateRoute>
                        <TeamsPage />
                    </PrivateRoute>
                }
            />
            <Route
                path='/roadmap'
                element={
                    <PrivateRoute>
                        <RoadMapPage />
                    </PrivateRoute>
                }
            />
            <Route
                path='/community'
                element={
                    <PrivateRoute>
                        <CommunityPage />
                    </PrivateRoute>
                }
            />
            <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
    </BrowserRouter>
