const mongoose = require('mongoose');
const avaibilitySchema = new mongoose.Schema ({
    fromMonth: {
        type: String, required: true
    },
    fromDay: {type: Number, required: true}
    ,
    toMonth:{type: String, required: true},
        toDay: {type: Number, required: true}
    ,
    available: {
        type: Boolean,
        default: true
    },
    pending: {
        type: Boolean,
        default: false
    }
});

const Avaibility = mongoose.model('avaibility', avaibilitySchema);

module.exports = Avaibility;