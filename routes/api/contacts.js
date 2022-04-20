const express = require('express');
const router = express.Router();
const contactsController = require('../../controller/contactsController');
const verifyRoles = require('../../middleware/verifyRoles');
const ROLES_LIST = require('../../config/roles_list')

router.route('/')
    .get(contactsController.getAllContacts)
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),contactsController.createNewContact)
    .put(verifyRoles(ROLES_LIST.Editor,ROLES_LIST.Admin),contactsController.updateContact)
    .delete(verifyRoles(ROLES_LIST.Admin),contactsController.deleteContact)

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),contactsController.getSingleContact)

module.exports = router