const User = require("./userModel");

exports.addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const token = newUser.generateAuthToken();
    await newUser.save();
    res.status(201).send({ user: newUser.name, token });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({ error: "Email already used" });
    } else {
      res.status(500).send({ error: "Oops, an error has occured" });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = user.generateAuthToken();
    res.status(200).send({ user: user.name, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


exports.updateUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const user = await User.findByCredentials(email, password)
    await User.findOneAndUpdate({_id : user._id} ,{ name });
    res.status(200).send({message: "updated user successfully" })

  } catch (error) {
    res.status(500).send({error: "Oops, an error has occured" })
  }

};

exports.deleteUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password)
    await User.deleteOne({_id: user._id})
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message })
  }

};