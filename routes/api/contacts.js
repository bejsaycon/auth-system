const express = require('express');
const router = express.Router();
const contactsController = require('../../controller/contactsController');

router.route('/')
    .get(contactsController.getAllContacts)
    .post(contactsController.createNewContact)
    .put(contactsController.updateContact)
    .delete(contactsController.deleteContact)

router.route('/:id')
    .get(contactsController.getSingleContact)

module.exports = router;