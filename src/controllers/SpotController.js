const Spot = require("./../models/Spot");
const User = require("./../models/User");

module.exports = {
  async index(req, res) {
    const { tech } = req.query;

    const spots = await Spot.find({ techs: tech });

    return res.json(spots);
  },

  async store(req, res) {
    // console.log(req.body)
    // console.log(req.file)

    const { filename } = req.file;
    const { company, price, techs } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);

    if (!user) return res.status(400).json({ error: "User does not exists" });

    const spot = await Spot.create({
      company,
      price,
      techs: techs.split(",").map(tech => tech.trim()),
      user: user_id,
      thumbnail: filename
    });

    return res.json(spot);
  }
};
