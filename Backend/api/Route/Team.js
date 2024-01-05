const router = require('express').Router();
const Team = require("../Model/Team.model");

// Get all teams
router.route('/').get((req, res) => {
  Team.find()
    .then(teams => res.json(teams))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new team
router.route('/add').post((req, res) => {
  const { teamname, description } = req.body;

  if (!teamname || !description) {
    return res.status(400).json('Error: Missing team name or description');
  }

  // Check if team with the same teamname already exists
  Team.findOne({ teamname: teamname })
    .then(existingTeam => {
      if (existingTeam) {
        return res.status(400).json('Error: Team with this name already exists');
      }

      // If the team doesn't exist, add the new team
      const newTeam = new Team({ teamname, description });

      newTeam.save()
        .then(() => res.json('Team added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(500).json('Error checking for existing team: ' + err));
});

// Update a team by ID
router.route('/update/:id').post((req, res) => {
  const { teamname, description } = req.body;

  Team.findById(req.params.id)
    .then(team => {
      if (!team) {
        return res.status(404).json('Error: Team not found');
      }

      team.teamname = teamname;
      team.description = description;

      team.save()
        .then(() => res.json('Team updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a team by ID
router.route('/delete/:id').delete((req, res) => {
  Team.findByIdAndDelete(req.params.id)
    .then(() => res.json('Team deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
