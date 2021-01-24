const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogsSchema = new Schema({

    title: { type: String, maxLength: 256, required: true, },
    body: String,
    img: { data: Buffer, contentType: String },
    author: String,
    tags: [String],
    // status: {
    //     type: String,
    //     enum: ['new', 'inProgress', 'done'],
    //     default: 'new',
    // },
    // createdAt: {
    //     type: Date,
    //     default: Date.now(),
    // },
    // updatedAt: Date,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }

});

const blogsModel = mongoose.model('Blogs', blogsSchema);
module.exports = blogsModel;