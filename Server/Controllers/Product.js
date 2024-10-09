// Model
const Product = require ("../Models//Product")

exports.createProduct = async (req,res) =>{
    try{
        console.log(req.body);
        const product = await Product.create(req.body);
        res.status(200).send(product);
    }catch(err){
        console.log(err);
        res.status(500).send("Create Product Server Error");
    };
};

exports.getAllProduct = async (req,res) =>{
    try{
        const product = await Product.find().populate("category","_id name");
        res.status(200).send(product);
    }catch(err){
        console.log(err);
        res.status(500).send("Get All Product Server Error");
    };
};

exports.getProductByFilter = async (req,res) =>{
    try{
        const { sort, order, limit } = req.body;
        const product = await Product.find()
        .limit(limit)
        .populate("category","_id name")
        .sort([[sort, order]]);
        res.status(200).send(product);
    }catch(err){
        console.log(err);
        res.status(500).send("Get Product By Filter Server Error ");
    };
};

exports.getProductByCount = async (req,res) =>{
    try{
        const count = parseInt(req.params.count);
        const product = await Product
            .find()
            .limit(count)
            .populate("category","_id name")
            .sort([["createdAt","desc"]]);
        res.status(200).send(product);
    }catch(err){
        console.log(err);
        res.status(500).send("Get "+count+" Product Server Error");
    };
};

exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id)
        .populate("category","_id name")
        .exec();
  
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      };
  
      res.status(200).json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json("Get Product By Id Server Error" );
    };
  };
  

exports.deleteProduct = async (req,res) =>{
    try{
        const deleted = await Product.findOneAndDelete({ _id:req.params.id }).exec();
        res.status(200).send(deleted);
    }catch(err){
        console.log(err);
        res.status(500).send("Delete Product Server Error ");
    };
};

exports.updateProduct = async (req,res) =>{
    try{
        const product = await Product.findOneAndUpdate({_id:req.params.id},
            req.body,
            {new:true}
        ).exec();
        res.status(200).send(product);
    }catch(err){
        console.log(err);
        res.status(500).send("Update Product Server Error ");
    };
};

const handleQuery = async (req, res, query) => {
    try {
        let products = await Product.find({ $text: { $search: query } })
        .populate("category","_id name");

        res.status(200).send(products);
    } catch (err) {
        console.log(err);
        res.status(500).send("HandleQuery Server Error" );
    };
};

const handleQueryCategory = async (req, res, category) => {
    try {
        let products = await Product.find({category})
        .populate("category","_id name");

        res.status(200).send(products);
    } catch (err) {
        console.log(err);
        res.status(500).send("handleQuery Category Server Error");
    };
};

const handleQueryPrice = async (req, res, price) => {
    try {
        let products = await Product.find({ 
            price: { 
                $gte: price[0], 
                $lte: price[1]  
            } 
        })
        .populate("category","_id name");

        res.status(200).send(products);
    } catch (err) {
        console.log(err);
        res.status(500).send("handleQuery Price Server Error");
    };
};

exports.searchProduct = async (req, res) => {
    const { query, price, category } = req.body;
    if (query) {
        await handleQuery(req, res, query);
    } else if(price !== undefined){
        await handleQueryPrice(req, res, price);
    } else if(category) {
        await handleQueryCategory(req,res,category);
    }else {
        res.status(400).send({ error: "Query parameter is missing" });
    };
};


