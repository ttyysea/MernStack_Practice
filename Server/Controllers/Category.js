// Model
const Category = require("../Models/Category");

exports.createCategory = async (req,res) =>{
    try{
        const { categoryName } = req.body;
        if (!categoryName) {
            return res.status(400).send("Name is required");
        }
        const category = await Category.create({ name : categoryName });
        res.send(category);
    }catch(err){
        console.log(err);
        res.status(500).send("Create Category Server Error");
    };
};

exports.getAllCategory = async (req,res) =>{
    try{
        const category = await Category.find().exec();
        res.send(category);
    }catch(err){
        console.log(err);
        res.status(500).send("Get All Category Server Error");
    }
};

exports.updateCategory = async (req,res) =>{
    try{
        const { id } = req.params;
        if (!id){
            return res.status(400).send("Id is required");
        };
        const { name } = req.body;
        console.log("Update ",name)
        const category = await Category.findByIdAndUpdate(
         id,
         { name } ,
         { new: true, runValidators: true }
        ).exec();
        res.send(category);
    }catch(err){
        res.status(500).send("Update Category Server Error");
    }
};

exports.getCategoryById = async (req,res) =>{
    try{
        const id = req.params.id;
        if (!id){
            return res.status(400).send("Id is required");
        }
        const category = await Category.findOne({_id:id}).exec();
        res.send(category);
    }catch(err){
        console.log(err);
        res.status(500).send("Get Category By Id Server Error");
    }
};

exports.deleteCategory = async (req,res) =>{
    try{
        const id = req.params.id;
        console.log(id)
        if (!id){
            return res.status(400).send("Id is required");
        }
        const category = await Category.findByIdAndDelete(id);
        res.send(category);
    }catch(err){
        console.log(err);
        res.status(500).send("Delete Category Server Error");
    }
};
