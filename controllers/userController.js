const mongoose = require('mongoose');  //extention
mongoose.connect('mongodb://localhost:27017/demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});    /// connection code (demo -database) //todo make url in a env

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
  );  //schema def for user collection
  
  const UserModel = mongoose.model("user", userSchema);  //create model with defined schema def



const register = async (req, res, next) => {  //asyc because we using await for user model 
  try {
    const Obj = {
      userName: req.body.username,
      email: req.body.email,
      passwd: req.body.passwd,
    };  //creating obj  (if reqiired make it an array obj={0:{set1},1:{set2}....})
    const newUser = await UserModel.create(Obj); // this will insert data
  } catch (err) {
    console.log(err.errmsg);
  }
    res.json({message: "successfully inserted"}); // response
};

const list = (req,res,next)=>{  //list fuction not using async since calls another f()
  listUsers(req,res,next);
}

const listUsers =async (req, res, next)=>{
  try {
    const users = await UserModel.find({}, { _id: 0, __v: 0 }); //retun all data
    //if need specific .find({name:"name"}, { _id: 0, __v: 0 })
    if (users.length > 0) {
      res.json({data: users});
    }
  } catch (err) {
    console.log(err.errmsg);
  }
}

module.exports = {register,list};