


// 'use strict';
//
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
//
// var BookSchema = new Schema({
//   //title: String,
//   // title: {
//   //   type: String,
//   //   required: true,
//   //   unqiue: true
//   // }
//
//   title: String
//   published: {
//     type: Date,
//     default: Date.now
//   },
//   keywords: Array,
//   published: Boolean,
//   author:{
//     type: Schema.ObjectId, // Can also be written as Schema.Type.ObjectId
//     ref:'User'
//   }
//   //Embedded sub-document
//   detail:{
//     modelNumber: Number,
//     hardcover: Boolean,
//     reviews: Number,
//     rank: Number
//   }
// });
//
// module.exports = mongoose.model('Book', BookSchema);
