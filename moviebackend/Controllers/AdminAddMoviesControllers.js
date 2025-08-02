const AdminAddMovies = require('../Models/AdminAddMovies');

exports.addmovieUser = async (req, res) => {
    try {

        const { movieName, releaseDate, director, actors, actress, trailerlink, description } = req.body;

        const photo = req.files['photo'] ? req.files['photo'][0].path : '';
        const banner = req.files['banner'] ? req.files['banner'][0].path : '';

        if (!movieName) {
            return res.status(400).json({ status: "error", message: "Movie Name is required" });
        }

        if (!releaseDate) {
            return res.status(400).json({ status: "error", message: "Release Date is required" });
        }

        if (!director) {
            return res.status(400).json({ status: "error", message: "Director Name is required" });
        }

        if (!actors) {
            return res.status(400).json({ status: "error", message: "Actor Name is required" });
        }

        if (!actress) {
            return res.status(400).json({ status: "error", message: "Actress Name is required" });
        }

        if (!trailerlink) {
            return res.status(400).json({ status: "error", message: "Trailer Link  is required" });
        }

        if (!photo) {
            return res.status(400).json({ status: "error", message: "Photo is required" });
        }

        if (!description) {
            return res.status(400).json({ status: "error", message: "Description is required" });
        }

        if (!banner) {
            return res.status(400).json({ status: "error", message: "Banner is required" });
        }

        const addMovie = new AdminAddMovies({movieName,releaseDate,director,actors,actress,trailerlink,photo,description,banner});
        await addMovie.save();

        return res.status(200).json({ status: "success", message: "New Movie Add Successfull!" });



    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
}

exports.getaddmovie = async (req, res) => {
    try {
        const getaddmoviedata = await AdminAddMovies.find({});

        const updatedData = getaddmoviedata.map(movie => ({
            ...movie.toObject(),
            banner: movie.banner ? `${req.protocol}://${req.get('host')}/${movie.banner}` : '',
            photo: movie.photo ? `${req.protocol}://${req.get('host')}/${movie.photo}` : ''
        }));

        return res.status(200).json({ status: "success", data: updatedData });

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};

