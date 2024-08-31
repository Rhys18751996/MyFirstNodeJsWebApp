export async function index(req, res) {
    console.log("the home/index route was called");
    var user = req.user ? req.user.username : null;
    res.render("home/", { user: user });
}

export async function home(req, res) {
    console.log("the home/home route was called");
    var user = req.user ? req.user.username : null;
    res.render("home/home", { user: user });
}