import Storage from "./js/models/Storage.js";
import Router from "./js/models/Router.js";

Storage.init();
const router = new Router();

router.get('/', () => {
  console.log(1);
});

router.get('/hello-world', () => {
  let page = document.querySelector('#root');
  page.innerHTML = `
    <h1>Hello, world!</h1>
  `
});


router.init();