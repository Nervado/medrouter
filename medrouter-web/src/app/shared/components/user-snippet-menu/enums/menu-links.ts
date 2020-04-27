import { DefaultRoutes } from "src/app/auth/enums/default-routes";

import {
  faUsersCog,
  faUserMd,
  faConciergeBell,
  faUserCog,
  faFlask,
  faHeartbeat,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

export const MenuLinks = {
  user: { icon: faUserTie, path: "/profile", label: "Meu perfil" },
  admin: {
    icon: faUsersCog,
    path: DefaultRoutes.admin,
    label: "Administração",
  },
  client: {
    icon: faHeartbeat,
    path: DefaultRoutes.client,
    label: "Paciente",
  },
  doctor: { icon: faUserMd, path: DefaultRoutes.doctor, label: "Médico" },
  recept: {
    icon: faConciergeBell,
    path: DefaultRoutes.recept,
    label: "Recepção",
  },
  owner: { icon: faUserCog, path: DefaultRoutes.owner, label: "Diretoria" },
  lab: { icon: faFlask, path: DefaultRoutes.lab, label: "Laboratório" },
};
