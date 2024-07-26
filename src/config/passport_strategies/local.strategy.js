const PassportLocalStrategy = require('passport-local').Strategy;
const {User} = require('../../api/models');
const {authJoiValidator} = require('../../validators');



opts ={
    usernameField: 'email',
    passwordField: 'password',
    // deviceToken: 'deviceToken',
    session: false,
    passReqToCallback: true,
};

const passportLogin = new PassportLocalStrategy(opts, async(req, email, password,  done)=>{
   try{
    authJoiValidator.loginBodyValidator(req.body);
    // return done(null, false, {message: 'Validation passed'});
   }catch(err){
    return done(null, false, {message: err.message});
   }

    try{
       
        const user = await User.findOne({"emailAddress.email": email.trim()});
        
        if(!user){
            return done(null, false, {message: 'Email does not exist'});
        }
        console.log(user);
       const isMatch =  await user.comparePassword(password);
       if(!isMatch){
           return done(null, false, {message: 'Invalid Password'});
       }
       user.deviceToken = req.body.deviceToken;
       await user.save();
       return done(null, user);

    }catch(err){
        return done(null, false, {message: `error with authenticating using local: ${err.message}`});
    }
}
);

module.exports = passportLogin