
var Register=require('../Models/Registration');  
var express=require('express');  
var router=express.Router();

router.get('/',function(req,res,next){ 
    Register.find()
    .then(Register => {
        res.send(Register);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving users."
        });
    });
}); 

router.post('/',function(req,res,next){ 
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }


    // Create a Product
    const reg = new Register({
        Firstname: req.body.Firstname, 
        Lastname: req.body.Lastname,
        Phonenumber: req.body.Phonenumber,
        Emailid: req.body.Emailid,
        Address:req.body.Address
    });

    // Save Product in the database
    reg.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the product."
        });
    });
});
router.put('/:id',function(req,res,next){ 
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find and update product with the request body
    Register.findByIdAndUpdate({_id:req.params.id}, {
        Firstname: req.body.Firstname, 
        Lastname: req.body.Lastname,
        Phonenumber: req.body.Phonenumber,
        Emailid: req.body.Emailid,
        Address:req.body.Address
    }, {new: true})
    .then(Register => {
        if(!Register) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send(Register);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.id
        });
    });
});
router.delete('/:id',function(req,res,next){ 
    Register.findByIdAndRemove({_id:req.params.id})
    .then(Register => {
        if(!Register) {
            return res.status(404).send({
                message: "user not found with id " + req.params.productId
            });
        }
        res.send({message: "user deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "user not delete product with id " + req.params.id
        });
    });
});
module.exports=router;  