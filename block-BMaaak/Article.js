var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var articleSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, minlength: 5 },
    tags: [String],
  },
  { timestamps: true }
);

articleSchema.index({ tags: 1 });
articleSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Article', articleSchema);
