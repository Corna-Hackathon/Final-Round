const { body, validationResult } = require('express-validator');
const express = require('express');
const multer = require('multer');
const fs = require('fs');

const Podcast = require('./schema/podcast');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
    }
});

const upload = multer({ storage: storage });

router.post('/upload',
    upload.fields([{
        name: 'audio', maxCount: 1
    },{
        name: 'image', maxCount: 1
    }]),
    async (req, res) => {
        if(req.isAuthenticated()){
            const fileList = req.files;
            const imageMimetype = fileList.image[0].mimetype;
            const audioMimetype = fileList.audio[0].mimetype;
            console.log(imageMimetype);
            const name = req.body.name;
            const user = req.user._id;
            if (imageMimetype?.includes("image") && audioMimetype?.includes("audio")) {
                const audio = fs.readFileSync(fileList.audio[0].path);
                const image = fs.readFileSync(fileList.image[0].path);
                try {
                    await Podcast.create({
                        name: name,
                        audio: audio,
                        image: image,
                        audioMimetype: audioMimetype,
                        imageMimetype: imageMimetype,
                        ownerId: user,
                    });
                    res.status(201).send({ status: 'Successful' });
                } catch(err){
                    res.status(500).send({ status: 'Error', errors: err });
                }
            } else {
                res.status(405).send({ status: 'Error', errors: 'Missing filename or audio' });
            }
            // if() fs.unlinkSync(req.files.path);
        } else {
            res.status(401).send({status: "Unauthorized"})
        }
})

router.post('/search', body("search").trim().escape(), async (req, res) => {
    const search = req.body.search;
    res.status(201).send(await Podcast.findByFileName(search));
})

router.get('/getAudio/:id', async (req, res) => {
    const id = req.params.id;
    const data = await Podcast.findById(id);
    res.contentType(data.get("audioMimetype"));
    res.status(201).send(data.get("audio"));
})

router.get('/getImage/:id', async (req, res) => {
    const id = req.params.id;
    const data = await Podcast.findById(id);
    res.contentType(data.get("imageMimetype"));
    res.status(201).send(data.get("image"));
})

router.get('/getName/:id', async (req, res) => {
    const id = req.params.id;
    const data = await Podcast.findById(id);
    res.status(201).send(data.get("name"));
})


module.exports = router;