
const handleLogIn = (req, res, db, bcrypt) =>
{
    db.select('email', 'secret',)
    .from('login')
    .where('email', '=', req.body.email)
    .then(data => {
        bcrypt.compare(req.body.password, data[0].secret, function(err, response) 
        {
            if(response)
            {
                db.select('*')
                .from('users')
                .where('email', '=', req.body.email)
                .then(user => {
                    res.json(user[0])
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

module.exports = {
    handleLogIn: handleLogIn
}