export function attachUserId(req, res, next) {
    if (req.session && req.session.userId) {
      req.userId = req.session.userId;
    } else {
      req.userId = null; // or handle unauthenticated case
    }
    next();
  }