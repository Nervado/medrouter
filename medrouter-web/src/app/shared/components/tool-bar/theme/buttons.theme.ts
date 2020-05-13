import {
  faUserEdit,
  faLock,
  faCrown,
  faCalendarPlus,
  faFileMedicalAlt,
} from "@fortawesome/free-solid-svg-icons";

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
  owner: [
    { icon: faChartBar, path: "../owners/dashboard" },
    { icon: faUserMd, path: "../owners/doctors" },
    { icon: faUsersCog, path: "../owners/managers" },
    { icon: faCrown, path: "../owners/owners" },
    { icon: faSearch, path: "../owners/search" },
  ],
  client: [
    { icon: faCalendarDay, path: "/schedules" },
    { icon: faLock, path: "../clients/new" },
  ],
  recept: [
    { icon: faHeartbeat, path: "../receptionists/clients" },
    { icon: faCalendarDay, path: "../receptionists/schedules" },
    { icon: faLock, path: "../clients/new" },
  ],
  doctor: [
    { icon: faFileMedical, path: "../doctors/create-prescription" },
    { icon: faFileMedicalAlt, path: "../doctors/exams" },
    { icon: faBookMedical, path: "../doctors/history" },
    { icon: faClock, path: "../doctors/schedule" },
    { icon: faCalendarPlus, path: "../doctors/create-schedule" },
  ],
  admin: [
    { icon: faChartBar, path: "../managers/dashboard" },
    { icon: faFlask, path: "../managers/labs" },
    { icon: faConciergeBell, path: "../managers/receptionists" },
    { icon: faSearch, path: "../managers/search" },
  ],
  lab: [],
};
