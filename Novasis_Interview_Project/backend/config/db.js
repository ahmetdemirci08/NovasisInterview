const mongoose = require("mongoose");

const db = ( )=>{

    mongoose.connect('mongodb+srv://ahmetkamildemirci01:PCN0HnBqugeybHBh@employee.vl6ddcd.mongodb.net/',{
 
    }).then(()=>{
        console.log("db connected !!!")
    })
    .catch((err)=>{
        console.log(err)
    })

}
module.exports = db