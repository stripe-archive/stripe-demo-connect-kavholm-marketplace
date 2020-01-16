import storage from '../../../helpers/storage';
import API from '../../../helpers/api';

export default async (req, res) => {
  let id = req.query.id;

  try {
    let listingRaw = storage
      .get('listings')
      .find({id: id})
      .value();

    let listing = {...listingRaw};

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

    if (listing.authorId) {
      try {
        let author = await API.makeRequest(
          'get',
          `/api/users/userInfo?id=${listing.authorId}`,
        );
        listing.author = author;
      } catch {}
    }

    return res.status(200).json(listing);
  } catch (err) {
    return res.status(400).json(err);
  }
};
