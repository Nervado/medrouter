import {
  faUserTie,
  faUsersCog,
  faHeartbeat,
  faUserMd,
  faConciergeBell,
  faUserCog,
  faFlask,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { DefaultRoutes } from "src/app/auth/enums/default-routes";

import { Colors } from "src/app/messages/toast/enums/colors";

export const RolesIcons = {
  user: {
    icon: faUser,
    path: ["profile", "user.userId"],
    label: "Perfil",
    color: Colors.PROFILE,
  },
  profile: {
    icon: faUserTie,
    path: ["profile", "user.userId"],
    label: "Perfil",
    color: Colors.PROFILE,
  },
  client: {
    icon: faHeartbeat,
    path: ["profile", "user.userId"],
    label: "Paciente",
    color: Colors.CLIENT,
  },
  admin: {
    icon: faUsersCog,
    path: DefaultRoutes.admin,
    label: "Administração",
    color: Colors.ADMIN,
  },

  doctor: {
    icon: faUserMd,
    path: DefaultRoutes.doctor,
    label: "Médico",
    color: Colors.DOCTOR,
  },
  recept: {
    icon: faConciergeBell,
    path: DefaultRoutes.recept,
    label: "Recepção",
    color: Colors.RECEPT,
  },
  owner: {
    icon: faUserCog,
    path: DefaultRoutes.owner,
    label: "Diretoria",
    color: Colors.OWNER,
  },
  lab: {
    icon: faFlask,
    path: DefaultRoutes.lab,
    label: "Laboratório",
    color: Colors.LAB,
  },
};
