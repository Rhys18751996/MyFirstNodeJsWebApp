import * as userService from "../services/userService.mjs";
import * as roleService from "../services/roleService.mjs";
import passport from "passport";
import User from "../models/sequelizeUser.mjs";

export async function index(req, res) {
    console.log("index (userController)");
    res.render("user/");
}

export async function register(req, res) {
    console.log("register (userController)");

    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    res.render("user/register");
}

export async function registerUser(req, res) {
  console.log("registerUser (userController)");

  // Check if the username or email already exists
  var username = req.body.username
  var email = req.body.email
  var user = req.user ? req.user.username : null;

  try {
    var existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if(typeof existingUser !== 'undefined') {
        console.log(`existingUser.username: ${existingUser.username}`);
        if (existingUser.username == username) {
          return res.status(400).json({ message: `username:${username} or email already exists` });
        }
    }

    const profilePicturePath = req.file ? req.file.path : null;
    console.log(profilePicturePath)

    // Hash the password
    password = await bcrypt.hash(req.body.password, 10);

    const userData = {
      email: req.body.email,
      username: username,
      password: password,
      name: req.body.name,
      phone_number: req.body.phonenumber, // Ensure matching property name
      address: req.body.address,
      profilePicture: profilePicturePath // Save the file path
    };

    console.log('User data:', userData);

    // Pass the user data to the service layer
    var result = await userService.createUser(userData);

    if (result.createdAt) {
      res.redirect("/user/login?successRegisterMsg=You have successfully created an account"); // Redirect on success
    } else {
      res.status(500).send('User creation failed');
    }
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).send('User creation failed');
  }
}

export function ProfileImagePage(req, res) {
    console.log("profile image page (userController)");
    var user = req.user ? req.user.username : null;
    let success = req.query.success;
    let error = req.query.error;
    res.render("user/uploadProfileImage", { user:user, success: success, error: error });
}
export function uploadProfileImage(req, res) {
    if (req.file) {
        console.log(req.file.filename)
        // save profile image in the users record by userId
        res.redirect('/user/uploadProfileImage?success=File uploaded successfully');
      } else {
        if (req.fileValidationError) {
            // Redirect with error feedback
            return res.redirect(`/user/uploadProfileImage?error=${encodeURIComponent(req.fileValidationError)}`);
          }
      }
}

export async function login(req, res) {
    console.log("login (userController)");
    var user = req.user ? req.user.username : null;
    let username = req.query.username;
    let errorMsg = req.query.Msg;
    let successRegisterMsg = req.query.successRegisterMsg;
    res.render('user/login', { 
        title: 'LoginPage', 
        errorMsg: errorMsg, 
        username: username, 
        successRegisterMsg:successRegisterMsg, 
        user:req.user });
}


export async function submitLogin(req, res, next) {
  try {
      const { username, password } = req.body;

      if (!username || !password) {
          return res.status(400).json({ message: "Username and password are required" });
      }

      // Authenticate using Passport
      passport.authenticate('local', async (err, user, info) => {
          if (err) {
              return next(err); // Pass errors to Express error handler
          }
          if (!user) {
              return res.redirect(`/user/login?Msg=Invalid username or password&username=${username}`);
          }

          // Log the user in
          req.logIn(user, (err) => {
              if (err) {
                  return next(err); // Pass errors to Express error handler
              }
              res.redirect('/home');
          });
      })(req, res, next);
  } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
}

export async function logout(req, res) {
    console.log("logout (userController)");
    var result = await req.session.destroy();
    //console.log(`logout result: ${JSON.stringify(result, null, 2)}`)
    res.redirect('/user/login');
}

export async function deleteUser(req, res) {
    let result = {}
    try {
        console.log("deleteUser (userController)");
        const reqJson = req.body;
        result.success = await User.destroy(reqJson.id)
    }
    catch(err) {
        result.success=false;
    }
    finally{
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
        //res.redirect("/");
    }
}

export async function createTestUser(req, res) {
    console.log("createTestUser (userController)");
    await userService.createTestUser();
    res.send("created test user");
    }


    
    export async function searchUser(req, res) {
        let queryString = req.query.q;
        console.log("the user/searchUser/search?q=" + queryString +" route was called");
        let msg = { queryString: queryString };
        res.send(msg);
    }
    
    async function saltPassword(pasword) {
        let SALT_FACTOR = 10;
        try {
            let salt = await bcrypt.genSalt(SALT_FACTOR);
            let hashedPassword = await bcrypt.hash(password, salt);
            return hashedPassword;
        }
        catch(err) {
            console.log(err);
        }
    }
     async function checkPasswordIsMatch(){
    
    }