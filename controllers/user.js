const bcrypt = require('bcrypt');
const saltRounds = 10;

const getUsers = (req, res, db) => {
    console.log(req.headers.authorization);
    db.select('email')
    .from('users')
    .then(users => {
        res.json(users);
    })
    .catch(err => res.status(400).json('error getting data users'));
}

const postUser = (req, res, db) => {

    const { email, password } = req.body;
    
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json('Error hashing password');
        }

        db('users')
            .insert({ email, password: hashedPassword })
            .returning('email')
            .then(email => {
                res.json(email);
            })
            .catch(err => res.status(400).json('Error adding user'));
    });
}

module.exports = {
    getUsers: getUsers,
    postUser: postUser
}