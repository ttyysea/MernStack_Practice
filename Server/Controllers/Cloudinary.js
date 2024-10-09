const cloudinary = require("cloudinary");

   // Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


exports.createImage = async (req,res) =>{
    try{
        const uploadResult = await cloudinary.uploader.upload(req.body.image, {
            public_id: Date.now,
            resource_type: "auto",
        });
        res.send(uploadResult);
    }catch(err){
        console.log(err);
        res.status(500).send("Upload Image Error")
    };
};

exports.deleteImage = async (req,res) =>{
    try{
        console.log("delete image body",req.body)
        const { public_id } = req.body;
        await cloudinary.uploader.destroy(public_id, (result) => {
            res.send(result);
        });
    }catch(err){
        console.log(err);
        res.status(500).send("Delete Image Error")
    };
};
