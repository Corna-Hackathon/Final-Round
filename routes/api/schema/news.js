const { mongoose } = require('mongoose')

const newsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    trust: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        require: true
    },
});

newsSchema.query.trust = () => {
    return this.where({trust: true})
}

newsSchema.statics.findByFileName = (name) => {
    if(name)
        return this.where({fileName: new RegExp(name, "i")}).trust().select('fileName');
    else
        return this.where().trust().select('name ownerId').populate("ownerId");
}

module.exports = mongoose.model('News   ', newsSchema);