// import Photo from '../models/Photo';

class PhotoController {
  store(req, res) {
    return res.json(req.file);
  }
}

export default new PhotoController();
