const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/IntellectNotes', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});    /// connection code

const userSchema = new mongoose.Schema(
    {
        userName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      passwd: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: {
        createdAt: true,
        updatedAt: true,
      },
    }
  );  //schema def
  




const register = (req, res, next) => {
    res.json({message: req.body.username}); // dummy function for now
};