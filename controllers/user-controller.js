const { User } = require('../models/User');
const { Thought } = require('../models/Thought');

const userController = {

    // Gets all existing users.
    getAllUser(req, res) {
        User.find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
            });
    },

    // Gets a specifc user by id.
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate([
                {
                    path: 'thoughts',
                    select: "-__v"
                },
                {
                    path: 'friends',
                    select: "-__v"
                }
            ])
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'This user does not exist.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
            });
    },

    // Creates a new user.
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
            });
    },

    // Updates an existing user.
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'This user does not exist.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
            });
    },

    // Deletes a specific user by id.
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'This user does not exist.' });
                    return;
                }
                User.updateMany(
                    { _id: { $in: dbUserData.friends } },
                    { $pull: { friends: params.id } }
                )
                    .then(() => {
                        Thought.deleteMany({ username: dbUserData.username })
                            .then(() => {
                                res.json({ message: "User deleted." });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(400).json(err);
                            });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    },

    // Adds a user as a friend.
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            {
                new: true,
                runValidators: true
            }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'This user does not exist.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
            });
    },

    // Deletes a  user by id.
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            {
                new: true,
                runValidators: true
            }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'This user does not exist.' });
                    return;
                }
                User.findOneAndUpdate(
                    { _id: params.friendId },
                    { $pull: { friends: params.userId } },
                    { new: true, runValidators: true }
                )
                    .then(dbUserData => {
                        if (!dbUserData) {
                            res.status(404).json({ message: 'This user does not exist.' });
                            return;
                        }
                        res.json(dbUserData);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = userController;