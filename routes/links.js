import express from 'express';
import linkCtrl from '../controllers/link-controller';

const router = express.Router();


/* GET ALL LINKS. */
router.get('/', linkCtrl.getLinks);

/* ADD LINK. */
router.post('/', linkCtrl.addingLink);


export default router;
