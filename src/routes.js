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
import Dashboard from "Admin/views/Dashboard.js";
import UserPage from "Admin/views/User.js";
// import DashboardP from "Professors/views/Dashboard";
// import Tables from "Professors/views/Tables";
// import Icons from "Professors/views/Icons";
// import Typography from "Professors/views/Typography";
// import Map from "Professors/views/Map";
// import User from "Professors/views/User";
// import Upgrade from "Professors/views/Upgrade";
// import Notifications from "Professors/views/Notifications";


var routes = [
  {
    path: "/profile",
    name: "Profile",
    icon: "nc-icon nc-badge",
    component: <Dashboard />,
    layout: "/admin",
  },
 
  {
    path: "/user-page",
    name: "Professor",
    icon: "nc-icon nc-single-02",
    component: <UserPage />,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/dashboard",
  //   name: "DashboardP",
  //   icon: "nc-icon nc-bank",
  //   component: <DashboardP />,
  //   layout: "/professor",
  // },
 
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: <Tables />,
  //   layout: "/professor",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: <Typography />,
  //   layout: "/professor",
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: <Upgrade />,
  //   layout: "/professor",
  // },
  //  {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: <Icons />,
  //   layout: "/professor",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: <Map />,
  //   layout: "/professor",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: <Notifications />,
  //   layout: "/professor",
  // },
  // {
  //   path: "/user",
  //   name: "Professor",
  //   icon: "nc-icon nc-single-02",
  //   component: <User />,
  //   layout: "/professor",
  // },
];
export default routes;
