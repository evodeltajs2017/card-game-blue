const contentContainer = document.querySelector(".content-container");
const router = new Router(contentContainer);

router.addRoute("/", Dashboard);
router.addRoute("/add-card-type", AddCardType);
router.addRoute("/card-types", CardTypes);
router.addRoute("/open-packs", OpenPacks);
<<<<<<< origin/master
router.addRoute("/grid-card-types", GridCardTypes);
=======
<<<<<<< origin/master
>>>>>>> local
router.go("/");
=======
router.addRoute("/view-cards", ViewCards);
router.initialize();
>>>>>>> local

const navbarContainer = document.querySelector(".navbar-container");
const navbar = new Navbar(navbarContainer, router);
navbar.initialize();