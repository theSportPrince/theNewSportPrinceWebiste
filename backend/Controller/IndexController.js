
const exampleController = {
  index: (req, res) => {
    console.log("helo");
    res.send('Welcome to the example controller!');
  }
};
module.exports = exampleController;
