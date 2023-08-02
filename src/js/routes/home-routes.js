import Router from "../utils/classes/Router.js";
import {index} from "../controllers/home-controller.js";

const router = new Router();

router.get('/', index);

export default router;