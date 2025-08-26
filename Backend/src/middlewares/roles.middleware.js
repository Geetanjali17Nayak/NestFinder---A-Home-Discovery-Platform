export const checkRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user?.role;
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Access Denied" });
      }
      next();
    } catch (err) {
      res.status(400).json({ message: "Invalid Token" });
    }
  };
};
