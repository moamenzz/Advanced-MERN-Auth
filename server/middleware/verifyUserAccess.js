export const verifyUserAccess = async (req, res, next) => {
  try {
    // Prüfen ob eine userId in den Parametern vorhanden ist
    if (req.params.a7aid) {
      // Admin darf alles
      if (req.roles.includes(ROLES_LIST.Admin)) {
        return next();
      }

      // Für normale Benutzer: Überprüfen ob die angeforderte ID mit ihrer eigenen übereinstimmt
      if (req.params.id !== req.userId.toString()) {
        return res.status(403).json({
          status: "error",
          message:
            "Sie haben keine Berechtigung auf diese Ressource zuzugreifen",
        });
      }
    }
    next();
  } catch (error) {
    console.error("Fehler bei der Zugriffsprüfung:", error);
    return res.status(500).json({
      status: "error",
      message: "Interner Server-Fehler bei der Zugriffsprüfung",
    });
  }
};
