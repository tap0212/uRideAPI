const express = require("express");
const router = express.Router();
const multer = require('multer')

// const upload = multer({dest: 'uploads/'})
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

// only images are stored
const imageFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
	else {
        cb(null, false)
    }
}
// limit can also be applied
const upload = multer({ 
	storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	imageFilter
})

const {
    getCarById,
  createCar,
  getCar,
  getAllCar,
  updateCar,
  removeCar
} = require("../controllers/car");
const { isSignedIn, isLender, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("carId", getCarById)
//actual routers goes here

//create
router.post(
  "/car/create/:userId",
  upload.single('carImage'),
  isSignedIn,
  isAuthenticated,
  isLender,
  createCar
);

//read
router.get("/car/:carId", getCar);
router.get("/cars", getAllCar);

//update
router.put(
  "/car/:carId/:userId",
  isSignedIn,
  isAuthenticated,
  isLender,
  updateCar
);

//delete

router.delete(
  "/car/:carId/:userId",
  isSignedIn,
  isAuthenticated,
  isLender,
  removeCar
);


module.exports = router;
