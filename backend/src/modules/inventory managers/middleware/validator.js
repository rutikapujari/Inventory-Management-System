const validator = (req, res, next) => {

  const { email, password } = req.body;

  if (!email || !password) {

    return res.status(400).json({
      message: "Please fill all fields",
    });

  }

  next();
};

module.exports = validator;


