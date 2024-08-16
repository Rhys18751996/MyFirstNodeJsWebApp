export async function index(req, res) {
    console.log("the home/index route was called");
    res.render("home/");
}

export async function home(req, res) {
    console.log("the home/home route was called");
    res.render("home/home");
}