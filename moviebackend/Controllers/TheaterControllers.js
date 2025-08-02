const Theater = require('../Models/Theater');

exports.theaterUser = async (req, res) => {
    try {

        const { theaterName, theaterLocation } = req.body;

        if (!theaterName) {
            return res.status(400).json({ status: "error", message: "Theater Name is required!" });
        }

        if (!theaterLocation) {
            return res.status(400).json({ status: "error", message: "Theater Location is required!" });
        }

        const addtheater = new Theater({theaterName,theaterLocation});
        await addtheater.save();

        return res.status(200).json({status:"success",message:"Theater Add Successfully!"});


    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
}

exports.getTheater = async (req,res) => {
    try{

        const getTheaterData = await Theater.find({});
        return res.status(200).json({status:"success",getData:getTheaterData});


    }catch(error){
        return res.status(500).json({status:"error",message:error.message});

    }
}

exports.deleteTheater = async (req, res) => {
    try {
        const { id } = req.body; 

        if (!id) {
            return res.status(400).json({ status: "error", message: "Theater ID is required!" });
        }

        const deletedTheater = await Theater.findByIdAndDelete(id);

        if (!deletedTheater) {
            return res.status(404).json({ status: "error", message: "Theater not found!" });
        }

        return res.status(200).json({ status: "success", message: "Theater deleted successfully!" });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};
