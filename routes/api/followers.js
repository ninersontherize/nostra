const express = require("express");
const router = express.Router();
const isEmpty = require("is-empty");

const Follower = require("../../models/Follower");

// @route POST api/followers/createFollower
// @desc Create Follower
// @access Private - backend only
router.post("/createFollower", (req, res) => {
  
  Follower.findOne({ follower_id: req.body.follower_id, followee_id: req.body.followee_id }).then( user_follower => {
    if (user_follower) {
      return res.status(400).json({ follower: "That follower already exists." });
    } else {
      User.findOne({ _id: req.body.follower_id }).then( follower_user => {
        if (!follower_user) {
          return res.status(404).json({ follower: "follower_id does not correspond to a user." });
        } else {
          User.findOne({ _id: req.body.followee_id }).then( followee_user => {
            if (!followee_user) {
              return res.status(404).json({ follower: "followee_id does not correspond to a user." });
            } else {
              const new_follower = new Follower({
                follower_id: follower_user._id,
                followee_id: followee_user._id,
                favorite: false
              });
        
              console.log(new_follower);
        
              new_follower.save().then(follower => res.json(follower)).catch(err => console.log(err));
            }
          });
        }
      }); 
     }
  });

});

// @route GET api/followers/followers
// @desc show followers through search or if body is empty show all followers
// @access public
router.get("/followers", (req, res) => {

  console.log(req.query);

  if ( isEmpty(req.query || req.query.search === "" ) ) {
    Follower.find().then( followers => res.json(followers)).catch(err => console.log(err));
  } else if (req.query.type === "followers") {
    Follower.find({ followee_id: req.query.search }).sort({favorite: -1}).then( followers => res.json(followers)).catch(err => console.log(err));
  } else {
    Follower.find({ follower_id: req.query.search }).sort({favorite: -1}).then( followees => res.json(followees)).catch(err => console.log(err));
  }

});

// @route GET api/followers/checkFollowed
// @desc return true if user is following a given user
// @access public
router.get("/checkFollowed", (req, res) => {
  Follower.find({ follower_id: req.query.follower, followee_id: req.query.followee }).count().then(follower_count => res.json(follower_count)).catch(err => console.log(err));
});

// @route DELETE api/followers/deleteFollower
// @desc Delete a follower by id
// @access private - backend only
router.delete("/adminDeleteFollower", (req, res) => {

  Follower.findOne({ _id: req.body.id }).then( follower => {
    if (!follower) {
      return res.status(404).json({ follower: "That id does not exist, delete failed" });
    } else {
      Follower.deleteOne({ _id: req.body.id }).then( follower => console.log(follower));
      return res.status(200).json({ follower: "Follower successfully deleted" });
    }
  });

});

// @route DELETE api/followers/deleteFollower
// @desc Delete a follower by id
// @access private - backend only
router.delete("/deleteFollower", (req, res) => {

  Follower.findOne({ follower_id: req.query.follower_id, followee_id: req.query.followee_id }).then( follower => {
    if (!follower) {
      return res.status(404).json({ follower: "That id does not exist, delete failed" });
    } else {
      console.log(follower)
      Follower.deleteOne({ _id: follower._id }).then( follower => console.log(follower));
      return res.status(200).json({ follower: "Follower successfully deleted" });
    }
  });

});

// @route PUT api/tournaments/:id/editFavorite
// @desc Favorite a follower by id
// @access private - backend only
router.put("/:id/editFavorite", (req, res) => {

  var id = req.params.id;
  
  Follower.findOne({ _id: id }).then( follower => {
    if (!follower) {
      return res.status(404).json({ follower: "That id does not exist, favorite failed" });
    } else {  
      Follower.updateOne({ _id: id }, {
        favorite: !follower.favorite
      }, function(err, affected, res) {
        console.log(res);
      })
      .then(() => {
        console.log("league updated");
        res.status(200).send({ message: "follower updated successfully"});
      });
    }
  });

});

module.exports = router;
