import Feed from "../models/feed.js";
import Article from "../models/article.js";

import discoverRssLink from "../util/discoverRssLink.js";
import parseFeed from "../util/parser.js";

const getFeeds = async (req, res, next) => {
  try {
    const feeds = await Feed.findAll();
    return res.status(200).json({
      feeds: feeds
    });
  } catch (err) {
    //return server if something goes wrong
    console.log(err);
    return res.status(500).json(err);
  }
};

const getFeed = async (req, res, next) => {
  const feedId = req.params.feedId;
  try {
    const feed = await Feed.findByPk(feedId);
    return res.status(200).json({
      feed: feed
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};


const deleteFeed = async (req, res, next) => {
  const feedId = req.params.feedId;
  try {
    var feed = await Feed.findByPk(feedId);
    if (!feed) {
      return res.status(400).json({
        message: "Feed not found"
      });
    } else {
      Article.destroy({
        where: {
          feedId: feed.id
        }
      });
      feed.destroy();
      return res.status(204).json({
        message: "Deleted successfully"
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const validateFeed = async (req, res, next) => {

  const url = await discoverRssLink.discoverRssLink(req.body.url);
  const categoryId = req.body.categoryId;

  if (typeof url === "undefined") {
    return res.status(500).json({
      error_msg: "Feed url is invalid. Are you sure the RSS feed is correct?"
    });
  }

  try {

    const feeditem = await parseFeed.process(url);
    if (feeditem) {
      Feed.findOne({
        where: {
          url: feeditem.self
        }
      }).then(feed => {
        if (!feed) {
          return res.status(200).json({
            categoryId: categoryId,
            feedName: feeditem.meta.title,
            feedDesc: feeditem.meta.description,
            url: req.body.url,
            rssUrl: feeditem.self,
            favicon: feeditem.image
          });
        } else {
          return res.status(402).json({
            error_msg: "Feed already exists."
          });
        }
      });

    } else {
      return res.status(500).json({
        error_msg: "Feed has no meta attributes"
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error_msg: "" + err
    });
  }
};

export default {
  getFeeds,
  getFeed,
  updateFeed,
  newFeed,
  deleteFeed,
  validateFeed
}