const bodyParser = require('body-parser');
const router = require('express').Router();
const { check, validationResult } = require("express-validator");
let Contact = require('../models/contact.model.js');

router.route('/details/:id').get((req,res)=>{
  Contact.findById(req.params.id)
    .then(contacts => res.json(contacts))
    .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/:id').get((req, res) => {
  Contact.find({userid: req.params.id})
    .then(contact => res.json(contact))
    .catch(err => res.status(400).json('Error: '+ err))
})

router.route('/add').post([
  check('name', 'The name field cannot be left empty!').notEmpty().trim(),
  check('tel', 'The telephone field cannot be left empty!').notEmpty().trim(),
  check('tel', 'The telephone number must be numeric!').isNumeric(),
  check('email', 'The email field cannot be left empty!').notEmpty().trim(),
  check('email', 'Please enter a valid email address!').normalizeEmail().isEmail()
  ], function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.json(errors);
    } else {
      const { name, tel, email, userid } = req.body;
      const newContact = new Contact(
        {
          userid,
          name,
          tel,
          email
        }
      );
      newContact.save()
        .then(()=> res.json("Contact added!"))
        .catch(err => res.status(400).json('Error: '+ err))
    }
  });

router.route('/:id').delete((req,res) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(() => res.json('Contact deleted.'))
    .catch(err => res.status(400).json("Error: "+err))
});

router.route('/update/:id').post([
    check('name', 'The name field cannot be left empty!').notEmpty().trim(),
    check('tel', 'The telephone field cannot be left empty!').notEmpty().trim(),
    check('tel', 'The telephone number must be numeric!').isNumeric(),
    check('email', 'The email field cannot be left empty!').notEmpty().trim(),
    check('email', 'Please enter a valid email address!').normalizeEmail().isEmail()
  ],(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.json(errors);
    } else {
        Contact.findById(req.params.id)
          .then(contact => {
            const {userid, name, tel, email } = req.body;
            contact.userid = userid;
            contact.name = name;
            contact.tel = tel;
            contact.email = email;
            contact.save()
              .then(() => res.json('Contact updated!'))
              .catch(err => res.json('Error: '+err))
          })
          .catch(err => res.status(400).json('Error: '+ err))
        }
    })

module.exports = router;
