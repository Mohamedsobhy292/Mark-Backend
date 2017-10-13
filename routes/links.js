import express from 'express';
import passport from 'passport';
import linkCtrl from '../controllers/link-controller';

const router = express.Router();


/* GET ALL LINKS. */
router.get('/', passport.authenticate('jwt', { session: false }), linkCtrl.getLinks);

/* GET SINGLE LINK */
router.get('/:id', passport.authenticate('jwt', { session: false }), linkCtrl.gettingSingleLink);

/* ADD LINK. */
router.post('/', passport.authenticate('jwt', { session: false }), linkCtrl.addingLink);

/* MOVE LINK. */
router.patch('/move/:id', passport.authenticate('jwt', { session: false }), linkCtrl.movingLink);

/* EDIT LINK. */
router.patch('/:id', passport.authenticate('jwt', { session: false }), linkCtrl.editLink);

/* DELETE LINK. */
router.delete('/:id', passport.authenticate('jwt', { session: false }), linkCtrl.deleteLink);


export default router;
