export async function index(req, res) {
    console.log("userController indexx fired");
    res.render("user/");
}

export async function getUser(req, res) {
    console.log("the user/user/:id route was called");
    // Simulate fetching user data from a database
    const userId = req.params.id;
    const user = { id: userId, name: 'John Doe', email: 'john.doe@example.com' };
    res.json(user);
}

export async function searchUser(req, res) {
    const queryString = req.query.q;
    console.log("the user/searchUser/search?q=" + queryString +" route was called");
    const msg = { queryString: queryString };
    res.json(msg);
}
