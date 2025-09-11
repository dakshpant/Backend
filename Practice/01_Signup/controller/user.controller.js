export default {
    homeRoute : async (req, res) => {
        try{
        res.status(200).send(`Welcome to the Home Page`);
        }
        catch(err){
            res.status(500).send({message:"Internal Server Error" ,error : err.message});
        }
    }
}