import mongoose, { Document } from "mongoose"
import bcrypt from "bcrypt"

interface IAddress extends Document{
    city: string,
    dist: string,
    pincode:number
}

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  age: number;
  phone:string
  address: IAddress;
}

export { IUser, IAddress };
    
const addressSchema = new mongoose.Schema<IAddress>({
    city: {
        type: String,
        required:true
    },
    dist: {
        type:String
    },
    pincode: {
        type:Number
    }
}, {
    _id: false,

})

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select:false
        
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    age: {
        type: Number,
        required: true,
    },
    phone: {
        type: String,
        required:true
    },
    address: addressSchema
    
}, {
    timestamps:true
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return;
    }
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
     
    } catch (error) {
        console.log(`something went wrong${error}`);
    }
})


const User = mongoose.model<IUser>("User", userSchema);
export default User;