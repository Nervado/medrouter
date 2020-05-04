import { faUserEdit, faLock } from "@fortawesome/free-solid-svg-icons";

import {
  faPlus,
  faPowerOff,
  faHome,
  faUser,
  faFileMedical,
  faFileInvoiceDollar,
  faBookMedical,
  faCalendarCheck,
  faPoll,
  faBell,
  faCommentAlt,
  faEllipsisH,
  faClock,
  faCalendarDay,
  faSignOutAlt,
  faUsersCog,
  faUserMd,
  faConciergeBell,
  faUserCog,
  faFlask,
  faHeartbeat,
  faHouseUser,
  faPortrait,
  faSearch,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";

export const Buttons = {
  profile: [
    { icon: faUserEdit, path: "edit-profile" },
    { icon: faHouseUser, path: "edit-address" },
    { icon: faPortrait, path: "edit-avatar" },
    { icon: faLock, path: "security" },
    { icon: faPowerOff, path: "unsubscribe" },
  ], //
  owner: [],
  client: [
    { icon: faCalendarDay, path: "/schedules" },
    { icon: faLock, path: "../clients/new" },
  ],
  recept: [],
  doctor: [
    { icon: faUserEdit, path: "../doctors/schedule" },
    { icon: faHouseUser, path: "../doctors/doctor-schedule" },
  ],
  admin: [
    { icon: faChartBar, path: "../managers/dashboard" },
    { icon: faFlask, path: "../managers/labs" },
    { icon: faConciergeBell, path: "../managers/receptionists" },
    { icon: faSearch, path: "../managers/search" },
  ],
  lab: [],
};
