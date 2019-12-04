import storage from '../../../helpers/storage';

export default async (req, res) => {
  let id = req.query.id;

  try {
    let listing = storage
      .get('listings')
      .find({id: id})
      .value();

    let lineItems = [
      {item: 'Listing price', amount: listing.price.amount},
      {
        item: 'Marketplace fees (10%)',
        amount: Math.ceil(listing.price.amount * 0.1),
      },
    ];

    let totalAmount = lineItems
      .map((a) => a.amount)
      .reduce((a, b) => {
        return a + b;
      }, 0);

    listing.lineItems = lineItems;
    listing.totalAmount = totalAmount;

    return res.status(200).json(listing);
  } catch (err) {
    return res.status(400).json(err);
  }
};
