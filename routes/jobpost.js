const express = require('express');
const bodyParser = require('body-parser').json();
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Job = require('../models/JobPost');

// @route       GET api/jobs
// @desc        GET all job posts
// @access      Public for now
router.get('/', async (req, res) => {
  try {
    const jobPosts = await Job.find();
    res.json(jobPosts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @rout      GET api/jobs/:id
// @desc      GET a job post by id
// @access    Public for now
router.get('/:id', async (req, res) => {
  try {
    let jobPost = await Job.findById(req.params.id);
    if (!jobPost) return res.status(404).json({ msg: 'No post found' });
    res.json(jobPost);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/jobs
// @desc        Add a new job post
// @access      Public
router.post(
  '/',
  [
    bodyParser,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('description', 'A description is required')
        .not()
        .isEmpty(),
      check('company', 'A company name is required')
        .not()
        .isEmpty(),
      check('salary', 'Salary is required')
        .not()
        .isEmpty(),
      check('category', 'Category is required')
        .not()
        .isEmpty(),
      check('location', 'Location is required')
        .not()
        .isEmpty(),
      check('contactUser', 'A contact user is required')
        .not()
        .isEmpty(),
      check('contactEmail', 'A contact email is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newPost = new Job({
        ...req.body
      });
      const job = await newPost.save();
      res.json(job);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  }
);

// @route       PUT api/jobs/:id
// @desc        update job post
// @access      Public
router.put('/:id', bodyParser, async (req, res) => {
  const jobFields = {};

  for (const [keys, values] of Object.entries(req.body)) {
    if (values) jobFields[keys] = values;
  }

  try {
    let jobPost = await Job.findById(req.params.id);
    if (!jobPost) return res.status(404).json({ msg: 'No post found' });
    jobPost = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: jobFields },
      { new: true }
    );
    res.json(jobPost);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @route       DELETE api/jobs/:id
// @desc        delete job post
// @access      Public
router.delete('/:id', bodyParser, async (req, res) => {
  try {
    let jobPost = await Job.findById(req.params.id);
    if (!jobPost) return res.status(404).json({ msg: 'No post found' });
    await Job.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Post removed' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
