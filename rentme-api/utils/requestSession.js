const UserRole = require("../constants/userRole");
function isSessionUserAdmin(req) {
  return (
    req.session && req.session.user && req.session.user.role === UserRole.Admin
  );
}

module.exports = isSessionUserAdmin;
