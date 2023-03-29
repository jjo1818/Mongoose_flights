// const { findByIdAndUpdate } = require('../models/flightModel');
const Destination = require('../models/destinationModel')
const Flights = require('../models/flightModel')

// The callback functions originally the second argument from -> app.get('/', () => {})
module.exports.index = async (req, res) => {
    try {
        const flights = await Flights.find();
        console.log(flights)
        // Looks in the views folder for "captains/Index" and passes { captains } data to the view (kind of like a server props object)
    res.render('flightView/Index', { flights })
    } catch (err) {
        console.log(err)
        res.send(err.message)
    }
    
}
// Those anonymous callback functions now have names: "index" and "show"
module.exports.show = async (req, res) => {
    try {
      const flights = await Flights.findById(req.params.id).populate({path: 'destinations', options: {sort: {arrival: 1}}});
      res.render("flightView/Show", { flights });
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  };

// GET /captains/new
// GET /flight/new
module.exports.new = (req, res) => {
    res.render("flightView/New");
  };

// POST /flight
module.exports.create = async (req, res) => {
    console.log("POST /flights");
    
    try {
      // use the model to interact with db and create a new document in the flight collection
      const result = await Flights.create(req.body);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  
    res.redirect("/flights");
  };
// DELETE /flight/:name
module.exports.delete = async(req, res) => {
    try {
      console.log("DELETE /flight/:id");
      await flight.findByIdAndDelete(req.params.id);
      console.log(req.params.id);
      res.redirect("/flights");
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  };

  module.exports.update = async (req, res) => {
    console.log("PUT /flights/:id");
    console.log(req.body);
  try {
      // pass the id to find the document in the db and the form data (req.body) to update it
      console.log('inside update')
      console.log(req.body)
      await Flights.findByIdAndUpdate(req.params.id, req.body);
      res.redirect(`/flights/${req.params.id}`);
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  };

  module.exports.createDestination = async(req, res) => {
    const destination = await Destination.create(req.body)
    await Flights.findByIdAndUpdate(req.params.id ,{
        $push:{
            destinations:destination._id
        }
    })
    res.redirect(`/flights/${req.params.id}`)
  }

  module.exports.indexDestination = async (req, res) => {
    res.send('')
  }
// // GET /flight/:name/edit
// module.exports.edit = async (req, res) => {
//     console.log("GET /flight/:id/edit");
//     try {
//       // const flight = await flight.findById(req.params.id);
//       const flight = await flight.findByIdAndUpdate(req.params.id, req.body);
//       res.render("flights/Edit", { flight });
//     } catch (err) {
//       console.log(err);
//       res.send(err.message);
//     }
//   };

  // PUT /flight/:id
  
//   module.exports.seed = async (req, res) => {
//     console.log("POST /flight/seed");
//     try {
//       await Flights.deleteMany({}); // Keep empty to delete everything
//       flight.create(flights);
//       res.redirect("/flights");
//     } catch (err) {
//       console.log(err);
//       res.send(err.message);
//     }
//   };
  
//   module.exports.clear = async (req, res) => {
//     console.log("DELETE /flights/clear");
//     try {
//       await Flight.deleteMany({});
//       res.redirect("/flights");
//     } catch (err) {
//       console.log(err);
//       res.send(err.message);
//     }
//   };            


  module.exports.deleteDestination = async (req, res) => {
      await Destination.findByIdAndDelete(req.params.did)
      await Flights.findByIdAndUpdate(req.params.id, {
        $pull:{
            destinations: req.params.did
        }
      })
      res.redirect(`/flights/${req.params.id}`)
  }
  module.exports.updateDestination = async (req, res) => {
    await Destination.findByIdAndUpdate(req.params.did, req.body)
    res.redirect(`/flights/${req.params.id}`)
  }

  module.exports.showDestination = async (req, res) => {
    const destination = await Destination.findById(req.params.did)
    res.render('destinationView/Edit', {destinationId: req.params.id, destination})
  }
           