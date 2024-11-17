import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Register from "./pages/Register";
import Sign from "./pages/Sign";
import Currentprojects from "./pages/Currentproject";
import MemberProject from "./pages/MemberProject";
import EmployeeLeaveReport from "./pages/EmployeeLeaveReport";
import EmployeeSignin from "./pages/EmployeeSignin";
import EmpDashboard from "./pages/EmpDashboard";
import EmpHistory from "./pages/EmpHistory";
import Timesheet from "./pages/Timesheet";
import Checkout from "./pages/Checkout";
import Result from "./pages/Result";
import PrivateRoute from './PrivateRoute/PrivateRoute';
import ModeratorSign from './moderator/ModeratorSign';
import ModeratorDash from './moderator/ModeratorDash';
import PrivateAdmin from './PrivateRoute/PrivateAdmin';
import Error from './component/Error';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="" element={<Home />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/sign" element={<Sign />} />
                <Route exact path="/project" element={<PrivateRoute><Currentprojects /></PrivateRoute>} />
                <Route exact path="/member" element={<PrivateRoute><MemberProject /></PrivateRoute>} />
                <Route exact path="/empreport" element={<PrivateRoute><EmployeeLeaveReport /></PrivateRoute>} />
                
                <Route exact path="/empsignin" element={<EmployeeSignin />} />
                <Route exact path="/empdash" element={<PrivateRoute><EmpDashboard /></PrivateRoute>} />
                <Route exact path="/emphistory" element={<PrivateRoute><EmpHistory /></PrivateRoute>} />
                <Route exact path="/timesheet" element={<PrivateRoute><Timesheet /></PrivateRoute>} />
                
                <Route exact path="/checkout" element={<Checkout />} />
                <Route exact path="/result" element={<PrivateRoute><Result /></PrivateRoute>} />

                //admin
                <Route exact path="/adminsign" element={<ModeratorSign/>} />
                <Route exact path="/admindash" element={<PrivateAdmin><ModeratorDash/></PrivateAdmin>} />
               

                <Route exact path="*" element={<Error />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
