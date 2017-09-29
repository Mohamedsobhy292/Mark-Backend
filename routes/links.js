import express from 'express';
import linkCtrl from '../controllers/link-controller';

const router = express.Router();


/* GET ALL LINKS. */
router.get('/', linkCtrl.getLinks);

/* GET SINGLE LINK */
router.get('/:id', linkCtrl.gettingSingleLink);

/* ADD LINK. */
router.post('/', linkCtrl.addingLink);

/* MOVE LINK. */
router.patch('/move/:id', linkCtrl.movingLink);

/* MOVE LINK. */
router.patch('/:id', linkCtrl.editLink);

/* DELETE LINK. */
router.delete('/:id', linkCtrl.deleteLink);


export default router;
