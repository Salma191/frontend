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

import DashboardP from "Professors/views/Dashboard";
import Tables from "Professors/views/Tables";
import Icons from "Professors/views/Icons";
import Typography from "Professors/views/Typography";
import Map from "Professors/views/Map";
import User from "Professors/views/User";
import Upgrade from "Professors/views/Upgrade";
import Notifications from "Professors/views/Notifications";
import PWManagement from "Professors/views/PWManagement";


var routesP = [

  {
    path: "/dashboard",
    name: "Profile",
    icon: "nc-icon nc-badge",
    component: <DashboardP />,
    layout: "/professor",
  },
  {
    path: "/icons",
    name: "Groupes",
    icon: "nc-icon nc-bullet-list-67",
    component: <Icons />,
    layout: "/professor",
  },
 
  {
    path: "/tables",
    name: "Student",
    icon: "nc-icon nc-single-02",
    component: <Tables />,
    layout: "/professor",
  },
  {
    path: "/typography",
    name: "Tooth",
    icon: "nc-icon nc-tile-56",
    component: <Typography />,
    layout: "/professor",
  },
  {
    path: "/pw",
    name: "PW Management",
    icon: "nc-icon nc-single-copy-04",
    component: <PWManagement />,
    layout: "/professor",
  },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: <Upgrade />,
  //   layout: "/professor",
  // },
  //
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
export default routesP;
