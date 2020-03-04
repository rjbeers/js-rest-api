const logoutRouter = require('express').Router();

logoutRouter.post('/', (req, res) => {
    // 401 if the token is invalid
    if (
        !req.session.authenticationHeader || // if there is no token in header
        !req.app.locals.db.users.find(u => u.tokens.includes(req.session.authenticationHeader))
    ) {
        // or if there is no user with that token
        res.status(401).send();
    }

    const headerToken = req.session['authenticationHeader'];
    const authenticatedUser = req.app.locals.db.users.find(u => u.tokens.includes(headerToken));

    if (authenticatedUser) {
        // remove token from token array on the user
        const tokenIndex = authenticatedUser.tokens.indexOf(headerToken);
        authenticatedUser.tokens.splice(tokenIndex, 1);

        delete req.app.locals.db.activeTokens[token];

        // remove token from session
        req.session.authenticationHeader = '';
        // send 200
        res.status(200).send();
    }
});

export default logoutRouter;
