const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new mongoose.Schema({
username: {
    type: String,
    required: true,
    unique: true,
},
password: {
    type: String,
    required: true,
    minlength: 3
},
passwordHash: {
    type: String
},
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

// Middleware to hash the password before saving it
userSchema.pre('save', async function (next) {
if (this.isModified('password') || this.isNew) {
    try {
    const saltRounds = 10;
    this.passwordHash = await bcrypt.hash(this.password, saltRounds);
    this.password = undefined; // Remove password from stored document
    next();
    } catch (error) {
    next(error);
    }
} else {
    next();
}
});

// Customize the JSON response by removing sensitive data
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash; // Remove the password hash
  },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
