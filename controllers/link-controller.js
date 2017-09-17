/* eslint no-underscore-dangle: "off" */
import mongoose from 'mongoose';
import cheerio from 'cheerio';
import request from 'request';

const Link = mongoose.model('Link');
const Card = mongoose.model('Card');

exports.getLinks = async function getLinks(req, res) {
  const links = await Link.find();
  res.json(links);
};


exports.addingLink = async function addingLink(req, res) {
  const link = new Link({
    url: req.body.url,
    position: req.body.position,
    color: req.body.color,
    cardId: req.body.cardId,
  });

  request(link.url, async (error, response, html) => {
    if (!error) {
      const $ = cheerio.load(html);
      const icon = $("link[rel*='icon']").attr('href');
      const title = $('title').text();
      const title2 = $("meta[property='og:title']").attr('content');
      link.icon = icon;
      link.name = title;
      if (title2) {
        link.name = title2;
      }
      try {
        await link.save();
        await Card.findByIdAndUpdate(
          link.cardId,
          { $push: { links: link._id } },
          { safe: true, new: true },
        );
        res.json(link);
      } catch (e) {
        res.status(400).send({ message: e.errors.name.message });
      }
    }
  });
};
