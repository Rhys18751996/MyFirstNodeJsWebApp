


exports.getUser = (req, res) => {
    const userId = req.params.id;
    // Simulate fetching user data from a database
    const user = { id: userId, name: 'John Doe', email: 'john.doe@example.com' };
    res.json(user);
};