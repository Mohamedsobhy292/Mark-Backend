import mongoose from 'mongoose';
import cheerio from 'cheerio';
import request from 'request';

const Link = mongoose.model('Link');

exports.getLinks = async function getLinks(req, res) {
  const links = await Link.find();
  res.json(links);
};


exports.addingLink = async function addingLink(req, res) {
  const link = new Link({
    url: req.body.url,
    position: req.body.position,
    color: req.body.color,
  });
  await request(link.url, (error, response, html) => {
    if (!error) {
      const $ = cheerio.load(html);
      const icon = $("link[rel*='icon']").attr('href');
      const title = $('title').text();
      link.icon = icon;
      link.name = title;
      try {
        link.save();
        res.json(link);
      } catch (e) {
        res.status(400).send({ message: e.errors.name.message });
      }
    }
  });
};
