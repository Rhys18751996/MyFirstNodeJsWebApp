export async function index(req, res) {
    console.log("the home/index route was called");
    res.render("home/", { });
}

export async function home(req, res) {
    console.log("the home/home route was called");
    console.log(`user = ${JSON.stringify(req.user, null, 2)}`)
    
    var user = req.user ? req.user : null; //req.user is the passport/session object
    res.render("home/home", { user: user });
}