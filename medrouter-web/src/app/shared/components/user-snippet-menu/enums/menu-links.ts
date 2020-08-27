import { DefaultRoutes } from "src/app/auth/enums/default-routes";

import {
  faUsersCog,
  faUserMd,
  faConciergeBell,
  faUserCog,
  faFlask,
  faHeartbeat,
  faUserTie,
  faUser,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";

export const MenuLinks = {
  profile: {
    icon: faUserTie,
    path: ["profile", "user.userId"],
    label: "Meu perfil",
  },

  manager: {
    icon: faUsersCog,
    path: [DefaultRoutes.manager],
    label: "Administração",
  },
  client: {
    icon: faHeartbeat,
    path: [DefaultRoutes.client],
    label: "Paciente",
  },
  doctor: {
    icon: faUserMd,
    path: [DefaultRoutes.doctor],
    label: "Médico",
  },
  recept: {
    icon: faConciergeBell,
    path: [DefaultRoutes.recept],
    label: "Recepção",
  },
  owner: { icon: faCrown, path: [DefaultRoutes.owner], label: "Diretoria" },
  lab: { icon: faFlask, path: [DefaultRoutes.lab], label: "Laboratório" },
};
