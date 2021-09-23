const { Schema, model } = require('mongoose');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      min: 3,
      max: 30,
    },
    email: String,
    phone: {
      type: String,
      min: 3,
      max: 30,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: {},
  },
);

const Contact = model('contact', contactSchema);

module.exports = Contact;