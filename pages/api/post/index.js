import nc from 'next-connect';
import { all } from '@/middlewares/index';


const handler = nc();

handler.use(all);
console.log("hello");

const maxAge = 1 * 24 * 60 * 60;

handler.get(async (req, res) => {
  const posts = await getPosts(
    req.db,
  //  req.query.from ? new Date(req.query.from) : undefined,
  //  req.query.by,
  //  req.query.limit ? parseInt(req.query.limit, 10) : undefined,
  );


  res.send({ posts });
});


export default handler;

export async function getPosts(db, from = new Date(), by, limit) {
  return db
    .collection('posts')
    .find({
      // Pagination: Fetch posts from before the input date or fetch from newest
      ...(from && {
        createdAt: {
          $lte: from,
        },
      }),
      ...(by && { creatorId: by }),
    })
    .sort({ createdAt: -1 })
    .limit(limit || 10)
    .toArray();
}
