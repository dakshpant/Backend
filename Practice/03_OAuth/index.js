import dotenv from "dotenv";
dotenv.config(); // MUST be at the very top
import express from "express";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import ensureAuth from "./middlewares/checkLoinOauth.js";


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// app.use("/", route);

// Session Cookies
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);
app.use(passport.initialize()); //initializes pasport
app.use(passport.session()); //tells passport to use session to store user info/ remember user

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
clientSecret: process.env.GOOGLE_CLIENT_SECRET,

callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        id: profile.id,
        userName: profile.displayName,
        email: profile.emails?.[0]?.value,
        photo: profile.photos?.[0]?.value,
      };
      return done(null, user);
    }
  )
);

// ROutes
app.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "Home Page",
  });
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // If login succeeded → redirect to profile page (we will create next)
    res.redirect("/profile");    
  }
);
app.get("/profile", ensureAuth, (req, res) => {
  res.status(200).json({
    message:"Success Logged In ✅",
    user: req.user
  });
});

app.get('/logout',(req,res)=>{
    req.logOut(err=>{
        if(err) return next(err);
        req.session.destroy(()=>{
            res.redirect('/')
        });
    })
})


// SErialize and deseriaalize user info
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.listen(port, () => {
  console.log(`App running on Port: ${port}`);
});
