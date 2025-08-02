const Shows = require('../Models/Shows');

exports.showUser = async (req, res) => {
    try {

        const { showName, showStartTime, showEndTime } = req.body;

        if (!showName) {
            return res.status(400).json({ status: "error", message: "Show Name is required!" });
        }

        if (!showStartTime) {
            return res.status(400).json({ status: "error", message: "Show Start Tine is required!" });
        }

        if (!showEndTime) {
            return res.status(400).json({ status: "error", message: "Show End Time is required!" });
        }

        const addShow = new Shows({showName,showStartTime,showEndTime});
        await addShow.save();

        return res.status(200).json({status:"success",message:"Show Add Successfull!"});


    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
}

exports.getshow = async (req,res) => {
    try{

        const getShowData = await Shows.find({});
        return res.status(200).json({status:"success",data:getShowData});

    }catch(error){
        return res.status(500).json({ status: "error", message: error.message });

    }
}

exports.deleteShow = async (req,res) => {
    try{

        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ status: "error", message: "show ID is required!" });
        }

        const deletemovieshow = await Shows.findByIdAndDelete(id);

        if(!deletemovieshow){
            return res.status(400).json({status:"error",message:"shows not found"});
        }

        return res.status(200).json({ status: "success", message: "Shows deleted successfully!" });

    }catch(error){
        return res.status(500).json({status:"error",message:error.message});
    }
}