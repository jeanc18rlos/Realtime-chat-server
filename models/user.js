var  mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require('bcrypt-nodejs');
//========================================
// User Schema
//========================================

var  UserSchema = new Schema({
    userName:{
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    email:{
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required : true
    },
    currency:{
        type: String,
        required : true
    },
    profile :{
        firstName :  {
            type: String,
            lowercase: true,
            required: true
        },
        lastName :{
            type: String,
            lowercase: true,
            required: true
        },
        birthDate : {
            type : Date,
            required : true
        },
        sex : {
            type:String,
            required:true    
        },
        country : {
            type: String,
            lowercase: true,
            required: true
        },
        city : {
            type:String,
            required: true
        },
        phone: {
            type: String,
            unique: true,
            required: true
        },
        inAppMessages : {
            type: Boolean,
            required : true
        },
        pushNotifications : {
            type: Boolean,
            required : true
        },
        phoneCalls: {
            type: Boolean,
            required : true
        },
        sendEmails: {
            type: Boolean,
            required : true
        },
        receiveSms: {
            type: Boolean,
            required : true
        },
    },
    session :{
        sessionTime :{
            type: Number,
            default: 10000
        },
        autoExclude :{
            type:Number,
            default:0},
        break : {
            type:Number,
            default:0},
    },
    depositLimit:{
        day: {
            type:Number,
            default:0},
        week: {
            type:Number,
            default:0},
        month: {
            type:Number,
            default:0}

    },
    verified:{
        emailVerified : { 
            type:Boolean,
            default: false
        },
        dniVerified:  { 
            type:Boolean,
            default: false
        }
    },
    userDocumentationId:{
        number: String,
        img: String,
    },
    role: {
        type : String,
        enum: ['Member', 'Client', 'Owner', 'Admin'],
        default: 'Member'
    },
    chips: {
        freeChips: {
            type :Number, 
            default : 5000
        },
        realMoneyChips: {
            type: Number,
            default : 0
        }
    },
    resetPasswordToken:{ type: String },
    resetPasswordExpires:{ type: Date }
},  
{
    timestamps:true
}
);
// method to compare password for login
UserSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err){
            return cb(err);
        }
        cb(null, isMatch);
    });
 };

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function(next){
    var  user = this,
          SALT_FACTOR = 5;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, function(err, salt){
    if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function(err, hash){
        if(err) return next(err);
        user.password = hash;
        next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);