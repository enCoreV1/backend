const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

// описание схемы карточки
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле с названием не может быть пустым'],
    minlength: [2, 'Минимальная длина поля с названием не может быть короче двух символов'],
    maxlength: [30, 'Максимальная длина поля с названием не может быть длиннее 30 символов'],
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Введите корректную ссылку',
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('card', cardSchema);
