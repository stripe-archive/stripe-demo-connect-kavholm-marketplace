import storage from '../../../helpers/storage';

export default async (req, res) => {
  let id = req.query.id;

  try {
    let listing = storage
      .get('listings')
      .find({id: id})
      .value();

    return res.status(200).json(listing);
  } catch (err) {
    return res.status(400).json(err);
  }
};
