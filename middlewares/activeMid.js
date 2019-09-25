module.exports.checkActive = (req, res, next) => {
  if (req.isAuthenticated() && req.user.active) {
    next();
  } else if(req.isAuthenticated()){
    res.redirect('/auth/checkMail'); //crear vista o mensaje de que el usuario no se ha activado
  } else {
    res.redirect('/auth/login')// crear alerta o mensaje de que el usuario no se ha logeado
  }
};