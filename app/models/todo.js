// load mongoose since we need it to define a model
    var mongoose = require('mongoose');

    module.exports = mongoose.model('Todo', {
        RestoBarName : String,
        RestoBarProduct : String,
        Rate : Number,
        done : Boolean
    });