const myMethod = (req, res, next) => {
     res.json({message: "Hi this is me"}); // dummy function for now
};

const aboutMe = (req, res, next) => {
    res.json({message: "Hi this is about me"}); // dummy function for now
};


module.exports = {myMethod,aboutMe};
