/* eslint no-underscore-dangle: "off" */
import mongoose from 'mongoose';
import cheerio from 'cheerio';
import request from 'request';

const Link = mongoose.model('Link');
const Card = mongoose.model('Card');

exports.getLinks = async function getLinks(req, res) {
  const user = req.user;
  const links = await Link.find({ userId: user.id });
  res.json(links);
};

exports.gettingSingleLink = async function gettingSingleLink(req, res) {
  const id = req.params.id;
  const user = req.user;
  try {
    const link = await Link.findOne({ _id: id, userId: user.id });
    res.json(link);
  } catch (e) {
    res.status(400).send({ error: 400, message: e });
  }
};


exports.addingLink = async function addingLink(req, res) {
  const link = new Link({
    url: req.body.url,
    position: req.body.position,
    color: req.body.color,
    cardId: req.body.cardId,
    userId: req.user.id,
  });
  const card = await Card.findOne({ _id: link.cardId, userId: req.user.id });
  if (!card) {
    res.status(401).send({ error: 401, message: 'You cant add to this card' });
  } else if (!link.url) {
    res.status(401).send({ error: 401, message: 'You must specify link url' });
  } else {
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
  }
};

exports.movingLink = async function movingLink(req, res) {
  const id = req.params.id;
  const user = req.user;
  const linktomove = await Link.findOne({ _id: id, userId: user.id });
  try {
    if (!linktomove) {
      res.status(400).send({ error: 401, message: 'You cant edit this card' });
    } else {
      await Link.findOneAndUpdate(
      { _id: id },
      { $set: { position: req.body.position, cardId: req.body.cardId } },
      async (err, link) => {
        // remove id from card
        await Card.findOneAndUpdate(
          { _id: link.cardId },
          { $pull: { links: id } },
        );
        Card.findOneAndUpdate(
          { _id: req.body.cardId },
          { $set: { links: id } },
          async (err3, newcard) => { await res.json(newcard); },
        );
      },
    );
    }
  } catch (e) {
    res.status(400).send({ error: 400, message: e });
  }
};

exports.editLink = async function editLink(req, res) {
  const id = req.params.id;
  const user = req.user.id;
  const linktoedit = await Link.findOne({ _id: id, userId: user });
  try {
    if (!linktoedit) {
      res.status(400).send({ error: 401, message: 'You cant edit this link' });
    } else {
      Link.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true },
      (err, card) => {
        res.json(card);
      },
    );
    }
  } catch (e) {
    res.status(400).send({ error: 400, message: e });
  }
};

exports.deleteLink = async function deleteLink(req, res) {
  const id = req.params.id;
  const user = req.user.id;
  try {
    const linktodelete = await Link.findOne({ _id: id, userId: user });
    if (!linktodelete) {
      res.status(400).send({ error: 401, message: 'You cant delete this link' });
    } else {
      Link.findByIdAndRemove(
      { _id: id },
      async (err, link) => {
          // REMOVE LINK ID FROM CARD ARRAY
        await Card.findOneAndUpdate(
          { _id: link.cardId },
          { $pull: { links: id } },
        );
        res.json(link);
      },
    );
    }
  } catch (e) {
    res.status(400).send({ error: 400, message: e });
  }
};
