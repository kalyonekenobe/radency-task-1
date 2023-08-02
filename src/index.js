import Storage from "./js/utils/classes/Storage.js";
import Router from "./js/utils/classes/Router.js";
import Builder from "./js/utils/classes/Builder.js";
import homeRoutes from "./js/routes/home-routes.js";

Storage.init();
Builder.init(document.querySelector('#root'));

const router = Router.combineRouters(homeRoutes);
router.init();