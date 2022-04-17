const data = {
    contacts: require('../model/contacts.json'),
    setContacts: function(data) {
        this.contacts = data 
    }
}

const getAllContacts = (req, res) => {
    res.json(data.contacts);
}

const createNewContact = (req, res) => {
    const newContact = {
        id: data.contacts?.length ? data.contacts[data.contacts.length - 1].id + 1 : 1,
        fullname: req.body.contactFullname,
        address: req.body.contactAddress,
        email: req.body.contactEmail,
        phone: req.body.contactPhone
    }

    if (!newContact.fullname || !newContact.address || !newContact.email || !newContact.phone ) {
        return res.status(400).json({ 'message': 'All details required!' });
    }
    data.setContacts([...data.contacts, newContact]);
    res.status(201).json(data.contacts);
}

const updateContact = (req, res) => {
    const contact = data.contacts.find(person => person.id === parseInt(req.body.id));
    if (!contact) {
        return res.status(400).json({'message':`Contact id ${req.body.id} not found`})
    }
    if (contact.fullname) contact.fullname = req.body.contactFullname ;
    if (contact.address) contact.address = req.body.contactAddress ;
    if (contact.email) contact.email = req.body.contactEmail ;
    if (contact.phone) contact.phone = req.body.contactPhone ;

    const filteredArray = data.contacts.filter(person => person.id !==parseInt(req.body.id));
    const unsortedArray = [...filteredArray, contact];
    data.setContacts(unsortedArray.sort((a, b)=> a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.contacts);
}

const deleteContact = (req, res) => {
    const contact = data.contacts.find(person => person.id === parseInt(req.body.id));
    if (!contact) {
        res.status(400).json({'message': `Contact id ${req.body.id} not found`});
    }
    const filteredArray = data.contacts.filter(person => person.id !== parseInt(req.body.id)) ;
    data.setContacts([...filteredArray]);
    res.json(data.contacts);
}

const getSingleContact = (req, res) => {
    const contact = data.contacts.find(person => person.id === parseInt(req.params.id));
    if (!contact) {
        return res.status(400).json({'message': `Contact id ${req.params.id} not found`});
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