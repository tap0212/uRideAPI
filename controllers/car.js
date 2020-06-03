const Car = require('../models/car')

exports.getCarById = (req, res, next, id) => {
    Car.findById(id).exec((err, car) => {
      if (err) {
        return res.status(400).json({
          error: "Car not found in DB"
        });
      }
      req.car = car;
      next();
    });
  };

exports.createCar = (req, res) => {
    // const car = new Car(req.body);
    // car.save((err, car) => {
    //   if (err) {
    //     return res.status(400).json({
    //       error: "NOT able to save car in DB",
    //       err
    //     });
    //   }
    //   res.json({ car });
    // });
    const car = new Car({
        brand: req.body.brand,
        modelName: req.body.modelName,
        year: req.body.year,
        category: req.body.category,
        user: req.body.user,
        carImage: req.file.path
    })
    car.save()
    .then(result => {
        console.log(result)
        res.status(200).json({result})
    })
    .catch(err => res.status(500).json({
        message: 'NOT able to save car in DB',
        err
    }))
}


exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "NO categories found"
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this category"
      });
    }
    res.json({
      message: "Successfull deleted"
    });
  });
};


exports.getCar = (req, res) => {
    return res.json(req.car)
}

exports.getAllCar = (req,res) => {
    Car.find().exec((err, cars) => {
        if(err){
            return res.status(400).json({
                error:"No Car Found"
            })
        }
        res.json(cars)
    })
}

exports.updateCar = (req, res) => {
    Car.findByIdAndUpdate(
      { _id: req.car._id },
      { $set: req.body },
      { new: true, useFindAndModify: false },
      (err, car) => {
        if (err) {
          return res.status(400).json({
            error: "You are not authorized to update this car"
          });
        }
        res.json(car);
      }
    );
  };

exports.removeCar = (req, res) => {
    const car = req.car;
    car.remove((err, car) => {
        if(err){
            return res.status(400).json({
                error:"Failed to delete"
            })
        }
        res.json({
            message:"Deleted"
        })
    })
}