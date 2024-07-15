import User from "../model/userModel.js";

//Create data  (Api) 
export const create = async(req, res)=>{
    try{


        const userData = new User(req.body);
        if(!userData){
            return res.status(404).json({msg : "User data not found"});
        }

        const savedData = await userData.save();
        res.status(200).json({msg : "Usre created successfully"}); 
    }catch(error){
        res.status(500).json({error: error});
    }
}

//get  data (api)
export const getAll = async (req, res)=>{

    try{
        const userData = await User.find();

        if(!userData){
            return res.status(404).json({msg: "User data not found "});
        }
        res.status(200).json(userData);

    }catch(error){
        res.status(500).json({error: error});

    }

}

//get one data (api)
export const getOne =async(req, res)=>{
    try{
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "User  not found "});
        }

        res.status(200).json(userExist);

    }catch(error){
        res.status(500).json({error: error});
    }
}

// profile Update  related (api)

export const update = async(req, res)=>
{
try{
    const id = req.params.id;
    const userExist = await User.findById(id);
    if(!userExist)
    {
        return res.status(401).json({msg: "Usre not found !"});
    }
    const updatedData =await User.findByIdAndUpdate(id,req.body,{new: true});
    res.status(200).json({msg : "Usre updated successfully"});

}catch(error){
    res.status(500).json({error: error}); 
}
}

//delete Data (api)

export const deleteUser = async (req, res)=>{
    try{
        const id=req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "User not exist"});
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({msg : "Usre Deleted successfully"});
   
    } catch(error){
        res.status(500).json({error: error}); 
    }
}