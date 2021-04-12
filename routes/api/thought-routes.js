const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

router.route('/')
    .get(getAllThought)
    .post(createThought);

router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:userId')
    .post(createThought);

router.route('/:thoughtId/reactions/')
    .post(createReaction)
    .delete(deleteReaction)

router.route('/:thoughtId/reactions/:_id')
    .delete(deleteReaction);

module.exports = router;