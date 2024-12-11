import { ROLES_LIST } from "../config/roles.js";

export const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) {
      return res.status(401).json({ message: "Keine Rollen gefunden" });
    }

    const rolesArray = [...allowedRoles];
    console.log("Erlaubte Rollen:", rolesArray);
    console.log("Benutzer Rollen:", req.roles);

    // Prüft, ob mindestens eine der Benutzerrollen in den erlaubten Rollen ist
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);

    if (!result) {
      return res.status(401).json({
        message: "Sie haben keine Berechtigung für diese Aktion",
      });
    }

    next();
  };
};
