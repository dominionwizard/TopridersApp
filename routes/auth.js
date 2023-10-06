import  express  from "express";
import {body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import Purchase from "../models/purchase.js"
import User from "../models/user.js"
import JWT from "jsonwebtoken"
import Joboffer from "../models/jobber.js"
import Delivery from "../models/delivery.js"
// import userSchema from "../models/user.js"

const app = express();

const router = express.Router();
 


router.post("/signup", body("email").isEmail().withMessage("the email is invalid"), 
body("password").isLength({min:5}).withMessage("the password is too short"),
async (req, res) =>{
const validationErrors = validationResult(req);

if(!validationErrors.isEmpty()){
    const errors = validationErrors.array().map(error=>{
        return{
        msg: error.msg
        };
    });

    return res.json({errors, data: null})
}

const {email, password} = req.body;


const user = await User.findOne({email})

if (user) {
    return res.json({

        errors:[
              {
                msg: "Email already exists!"
              },
            ],
        
            data : null
    });
}else{

  alert("You can now loggin with your details!")
}

const hashedPassword = await bcrypt.hash(password, 10);


  const newUser = await User.create({
    email,
    password:hashedPassword,
  });
  
  
  
 

});

  

// res.json({
// errors:[],
// data:{
//   token,
//   user: {

//     id:newUser._id,
//     email: newUser.email
//   }
//   }


// });




router.post("/login", async (req, res) =>{
  // to get d email and password
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if(!user){
    return res.json({errors:
      [
    {
      msg: "invalid credentials"
    }
  ]
    });
    data: null
  };

console.log(user)

  const isMatch = await bcrypt.compare(password, user.password);
  
if(!isMatch){
  
  return res.json({errors:
    [
  {
    msg: "invalid credentials"
  }
],
data: null
  });
 
}

// const hashedPassword = await bcrypt.hash(password, 10);
// const newUser = await User.create({
//   email,
//   password:hashedPassword
// })


if(isMatch){

  const token = await JWT.sign(
    {email:user.email},
    `${process.env.JWT_SECRET_KEY}`,
    {
      expiresIn:'24h',
    }
  );


return res.json({
errors:[],
data:{
  token,
  user: {

    id:user._id,
    email: user.email
  }
  }


});


}
})




router.post("/hire", function (req, res){

  console.log("working")
  let newPurchase = new Purchase({

      first:req.body.first,

      last:req.body.last,

      email: req.body.email,

      city: req.body.city,

        nin: req.body.nin,

      state: req.body.state,

      phone: req.body.phone,

      gname:req.body.gname,

      gaddress: req.body.gaddress,

      gnin: req.body.gnin
  })

  
  newPurchase.save();
  res.send({


    first:req.body.first,

      last:req.body.last,

      email: req.body.email,

      city: req.body.city,

      state: req.body.state,

      phone: req.body.phone,

      nin: req.body.nin,

      gname:req.body.gname,

      gaddress: req.body.gaddress,

      gnin: req.body.gnin
  }

  );
});




router.post("/jobber", function (req, res){
console.log("submitted")
const newJoboffer = new Joboffer({

firstname: req.body.firstname,

lastname: req.body.lastname,

email: req.body.email,

experience: req.body.experience,

state: req.body.state,

phone: req.body.phone,

lisence: req.body.lisence

})
newJoboffer.save();
// res.redirect("/")
res.send({

  firstname: req.body.firstname,

  lastname: req.body.lastname,
  
  email: req.body.email,
  
  experience: req.body.experience,
  
  state: req.body.state,
  
  phone: req.body.phone,
  
  lisence: req.body.lisence
})

})



router.post("/delivery", function (req, res){
  console.log("delivered")
  const newDelivery = new Delivery({
  
  first: req.body.first,
  
  last: req.body.last,
  
  phone: req.body.phone,
  
  location: req.body.location,
  
  destination: req.body.destination,
  
  number: req.body.number,
  
  reference: req.body.reference,

  worth: req.body.worth
  
  })
  newDelivery.save();
  // res.redirect("/")
  res.send({
  
    first: req.body.first,
  
    last: req.body.last,
    
    phone: req.body.phone,
    
    location: req.body.location,
    
    destination: req.body.destination,
    
    number: req.body.number,
    
    reference: req.body.reference,
    
    worth: req.body.worth

  })
  
  })



// DELETE

router.delete("/del/:email", async (req, res)=>{


let delemail=req.params['email']
 let userSchema = await User.findOneAndDelete({email:delemail}) 

 console.log(userSchema)


if(!userSchema)
{

  res.send("Does not exist")
}

else{

res.send("Successfully deleted!")

}


})


router.get("/getAllUser", async(req,res)=>{

try {
const allUser = await User.find({});

res.send ({status: "ok", data: allUser})

}catch (error){
  console.log(error)
}
})


// ADMIN DELETE

router.delete("/deleteUser", async (req, res)=>{
const {userid}= req.body
try{
const deleted = await User.deleteOne({_id:userid}  )
   console.log(deleted)
res.send({status: "ok", data: "Deleted"})

}catch(error){
  console.log(error)
}


})

// // router.delete("deleteUser", async (req, res)=>{


// //   let deluser=req.params['email']
// //    let userSchema = await User.findOneAndDelete({email:deluser}) 
  
// //    console.log(userSchema)
  
  
// //   if(!userSchema)
// //   {
  
// //     res.send("Does not exist")
// //   }
  
// //   else{
  
// //   res.send("Successfully deleted!")
  
// //   }
  
  
//   })
  



export default router;




  





