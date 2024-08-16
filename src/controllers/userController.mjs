

export function index(req, res) {
    console.log("userController indexx fired");
    res.render("user/");
}

export function getUser(req, res) {
    console.log("the user/user route was called");
    // Simulate fetching user data from a database
    const userId = req.params.id;
    const user = { id: userId, name: 'John Doe', email: 'john.doe@example.com' };
    res.json(user);
}

