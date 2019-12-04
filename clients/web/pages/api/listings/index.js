import storage from '../../../helpers/storage';

export default async (req, res) => {
  // 1) Get listings and return
  try {
    let listings = storage.get('listings').value();
    return res.status(200).json(listings);
  } catch (err) {
    return res.status(400).json(err);
  }
};
