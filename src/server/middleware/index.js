export const mustBeLoggedIn = (req, res, next) => {
	try {
		if (req.session.passport.user) {
			return next();
		}
	} catch (e) {
		console.log(e);
	}
	res.redirect('/');
};