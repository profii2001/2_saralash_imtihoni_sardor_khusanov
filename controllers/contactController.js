const getContacts = async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
  };
  
  const createContact = async (req, res) => {
    console.log("The request body is :", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400);
      throw new Error("All fields are  need !");
    }
    const contact = await Contact.create({
      name,
      email,
      phone,
      user_id: req.user.id,
    });
  
    res.status(201).json(contact);
  };
  
 
  const getContact = async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    res.status(200).json(contact);
  };
  
 
  const updateContact = async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
  
    if (contact.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User don't have permission");
    }
  
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
  
    res.status(200).json(updatedContact);
  };
  

  const deleteContact =async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User don't have permission");
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
  };
  
  module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
  };