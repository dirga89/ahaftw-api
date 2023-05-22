const jwt = require('jsonwebtoken');

const handleLogIn = (req, res, db, bcrypt) =>
{
    db.select('email', 'password',)
    .from('users')
    .where('email', '=', req.body.email)
    .then(data => {
        bcrypt.compare(req.body.password, data[0].password, function(err, response) 
        {
            if(response)
            {
                db.select('*')
                .from('users')
                .where('email', '=', req.body.email)
                .then(user => {
                    
                    const accessToken = generateAccessToken( {user: req.body.email} );
                    res.json( { user: user[0], accessToken: accessToken } );
                })
                .catch(err => res.status(400).json('no user'));
            }
            else
            {
                res.status(400).json('wrong credentials!');
            }
        })
    })
    .catch(err => res.status(400).json('wrong credentials'));
    
}

// accessTokens
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
}

// refreshTokens
let refreshTokens = [];
function generateRefreshToken(user) {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "20m"});
    refreshTokens.push(refreshToken);
    return refreshToken;
}

module.exports = {
    handleLogIn: handleLogIn
}