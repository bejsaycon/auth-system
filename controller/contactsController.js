const Contact = require('../model/Contact');

const getAllContacts = async(req, res) => {
    const contacts = await Contact.find();
    if (!contacts) return res.status(204).json({ 'message': 'No contacts found.' });
    res.json(contacts);
}

const createNewContact = async(req, res) => {
    if (!req?.body?.contactFullname || !req?.body?.contactAddress || !req?.body?.contactEmail || !req?.body?.contactPhone ) {
        return res.status(400).json({ 'message': 'All details required!' });
    }
    try {
        const result = await Contact.create({
            fullname: req.body.contactFullname,
            address: req.body.contactAddress,
            email: req.body.contactEmail,
            phone: req.body.contactPhone
        });
        res.status(201).json(result);
    } catch(err) {
        console.error(err);
    }
}

const updateContact = async(req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({'message':`ID PARAMETER REQUIRED`})
    }
    const contact = await Contact.findOne({ _id: req.body.id }).exec();
    if (!contact) {
        return res.status(204).json({ "message": `No contact matches ID ${req.body.id}.` });
    }

    if (req?.body?.contactFullname) contact.fullname = req.body.contactFullname ;
    if (req?.body?.contactAddress) contact.address = req.body.contactAddress ;
    if (req?.body?.contactEmail) contact.email = req.body.contactEmail ;
    if (req?.body?.contactPhone) contact.phone = req.body.contactPhone ;

    const result = await contact.save();
    res.json(result);
}

const deleteContact = async(req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Contact ID required.' });
    const contact = await Contact.findOne({ _id: req.body.id }).exec();
    if (!contact) {
        res.status(204).json({'message': `Contact id ${req.body.id} not found`});
    }
    const result = await contact.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getSingleContact = async(req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Contact ID required.' });
    const contact = await Contact.findOne({ _id: req.params.id }).exec();
    if (!contact) {
        return res.status(400).json({'message': `No contact matches ID ${req.params.id}`});
    }
    res.json(contact);
}

module.exports = {
    getAllContacts,
    updateContact,
    createNewContact,
    deleteContact,
    getSingleContact
}