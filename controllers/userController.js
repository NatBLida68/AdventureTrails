const mongoose = require('mongoose');  //extention
const { response } = require('../app');
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

const update = async (req, res, next) => {    //update email by username and password match
  let responseMessage ="";
  try {
      let userName =req.body.username,
      email= req.body.email,
      passwd= req.body.passwd;
      console.log(userName,email,passwd);
      const user = await UserModel.findOneAndUpdate(
        { userName:userName,passwd:passwd},
        {email:email},
        {
          new: true, //to return new doc back
        //  runValidators: true, //to run the validators if specified in the model
        }
      );
      
      if (user != null) {
        responseMessage = "successfully Updated";
      }
      else{
        responseMessage = "user name and password not matched"
      }
  } catch (err) {
    console.log(err.errmsg);
  }
    res.json({message: responseMessage}); // response
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
    else {
      res.status(400).json({
        status: 'success',
        data: {
          message: 'No notes available in the repo',
        },
      });
    }
  } catch (err) {
    console.log(err.errmsg);
  }
}

const deleteUser = async (req, res, err) => {  //delete by user name
  let userName =req.params.userName;

  const delDet = await UserModel.deleteOne({ userName: userName });
  console.log(delDet.deletedCount);
  if(delDet.deletedCount > 0){
  res.json({message: "Deleted successfully"}); // response
  }
  else{
    res.json({message: "record not found"}); // response
  }

};

const user1 = async (req, res, err) => {  //cookie tests
  res.cookie('name', req.params.name);
  res.send('<p>Cookie set:<a href="/me/who"> View here </a>');
};

const user2 = async (req, res) => {
  res.send(req.cookies.name);
  };

  const sessionCount = async (req, res, next)=>{
    console.log(req.session);
      if (req.session.views) {
        req.session.views++;
        res.send(`You visited this page ${req.session.views} times`);
      } else {
        req.session.views = 1;
        res.send('Welcome to this page for the first time!');
      }
  };
module.exports = {register,list,update,deleteUser,user1,user2,sessionCount};  //use this or exports.function name  , exports. looks better so now onwards use that