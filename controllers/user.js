
const getUsers = (req, res, db) =>
{
    db.select('email')
    .from('users')
    .then(users => {
        res.json(users)
    })
    .catch(err => res.status(400).json('error getting data users'));
    
}

module.exports = {
    getUsers: getUsers
}