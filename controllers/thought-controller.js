const { User, Thought } = require('../models');

const thoughtController = {
    // Gets all existing thoughts.
    getAllThought(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
            });
    },

    // Gets a specific thought from id.
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'This thought does not exist.' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
            });
    },

    // Creates new thought.
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
                    .then(dbUserData => {
                        if (!dbUserData) {
                            res.status(404).json({ message: 'This user does not exist.' });
                            return;
                        }
                        res.json(dbUserData);
                    })
                    .catch(err => res.json(err));
            })
            .catch(err => {
                console.log(err);
            });
    },

    // Updates an existing thought.
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'This thought does not exist.' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
            });
    },

    // Deletes a specific thought by id.
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'This thought does not exist.' });
                    return;
                }
                User.findOneAndUpdate(
                    { username: dbThoughtData.username },
                    { $pull: { thoughts: params.id } }
                )
                    .then(() => {
                        res.json({ message: 'Thought deleted.' });
                    })
                    .catch(err => {
                        console.log(err);
                    });;
            })
            .catch(err => {
                console.log(err);
            });
    },

    // Adds a reaction to a thought.
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            {
                new: true,
                runValidators: true
            }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'This thought does not exist.' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
            });
    },

    // Deletes a specific thought's reaction by id.
    deleteReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: body.reactionId } } },
            {
                new: true,
                runValidators: true
            }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'This thought does not exist.' });
                    return;
                }
                res.json({ message: 'Reaction deleted.' });
            })
            .catch(err => {
                console.log(err);
            });
    },
}

module.exports = thoughtController;