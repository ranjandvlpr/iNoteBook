const express = require('express');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const user = require("../models/User");

//Route 1: get all notes using GET method
router.get('/fetchallnotes', fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    //console.log(req.user.id)
    res.json(notes);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//Route 2: adding the notes using Post method
router.post(
  "/addnote", fetchUser,
  [
    body("title", "Enter a valid tiitle").isLength({ min: 3 }),
    body("description", "Discripation at least six characters").isLength({ min: 6 }),
  ], async (req, res) => {
    try {
      // If there error
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      // console.log(errors)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        userId: req.user.id,
        title: title,
        description: description,
        tag: tag
      }
      )
      const savednote = await note.save();
      res.json(note);
    }
    catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 3: udate the note using Put method login required
router.put(
  "/updatenote/:id", fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    // create new object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //find the note to be update and update it
    let note = await Note.findById(req.params.id);
    if (!note) { res.status(400).send("Not Found") }

    if (note._id.toString() !== req.params.id) {
      return res.status(401).send("Not Allowed")
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note });
  });

//Route 4: delete the note using delete method login required
router.delete(
  "/deletenote/:id", fetchUser, async (req, res) => {

    //find the note  for delete
    let note = await Note.findById(req.params.id)
    if (!note) { res.status(400).send("Not Found") }

    //
    console.log("id: ", req.params.id)
    console.log("userId: ", req.user.id)
    console.log("userId: ", note.userId)

    if (note._id.toString() !== req.params.id || note.userId.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed")
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({ "Success": "Note has been delete", note: note });
  });

module.exports = router;
