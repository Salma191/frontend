/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/



import Dashboard from "Student/views/Dashboard";
import User from "Student/views/User";


var routesS = [

    {
        path: "/dashboard",
        name: "Profile",
        icon: "nc-icon nc-bank",
        component: <Dashboard />,
        layout: "/student",
    },
    {
        path: "/icons",
        name: "Dent",
        icon: "nc-icon nc-diamond",
        component: <User />,
        layout: "/student",
    },



];
export default routesS;
