const { Contact } = require("../../models/contact");
const ctrlWrapper = require("../../helper/ctrlWrapper");
const User = require("../../models/user")


const contactAdd = async (req, res, next) => {
  try {
    const { name, tel, email, commit } = req.body;
    const { _id } = req.user;
 
    const user = await User.findById(_id);
    if (!user) {
      return next(RequestError(401, "Unauthorized"));
    }

    if (!name || !tel) {
      return res.status(400).json({
        status: "fail",
        message: "Необходимо заполнить все поля: имя, телефон и email",
      });
    }

   
    const existingContact = await Contact.findOne({ name, owner: _id });

    if (existingContact) {
      return res.status(409).json({
        status: "fail",
        message: `Контакт с именем ${name} уже существует.`,
      });
    }

    // Создание нового контакта
    const newContact = await Contact.create({
      name,
      tel,
      email,
      commit,
      owner: _id,
    });

    // Ответ с созданным контактом
    res.status(201).json({
      status: "success",
      data: newContact,
    });
  } catch (error) {
    console.error("Ошибка при добавлении контакта:", error);
    res.status(500).json({
      status: "error",
      message: "Ошибка на сервере",
    });
  }
};

const contactsList = async (req, res, next) => {
  try {
    const { _id } = req.user;
   
    const user = await User.findById(_id);
    if (!user) {
      return next(RequestError(401, "Unauthorized"));
    }
  
    const result = await Contact.find({owner: _id});
    
    res.status(200).json({
      status: "success",
      code: 200,
      result,
    });
  } catch (error) {
    next(error);
  }
};

const contactDel = async (req, res, next) => {
  //console.log(req.params.id);
  const { id } = req.params;
  console.log("Deleting contact with ID:", id);
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    return next(RequestError(404, "Contact not found"));
  }
  console.log("Contact deleted successfully:", result);
  res.status(200).json({
    status: "success",
    code: 200,
    result,
  });
};

module.exports = {
  contactsList,
  contactAdd,
  contactDel,
};
