const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  userid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  tel: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
