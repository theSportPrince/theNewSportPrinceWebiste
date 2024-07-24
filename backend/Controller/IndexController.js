
const exampleController = {
  index: (req, res) => {
    console.log("heelo");
    res.send('Welcome to the example controller!');
  }
};
module.exports = exampleController;
