import { body } from "express-validator";

export const registerValidation = [
    body('fullName').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('avatarUrl').optional().isURL().withMessage('Enter a valid URL'),
]

export const loginValidation = [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
]

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString().withMessage('Title must be at least 3 characters long'),
    body('text', 'Введите текст статьи').isLength({ min: 3 }).isString().withMessage('Text must be at least 3 characters long'),
    body('tags', 'Введите теги статьи').optional().isLength({ min: 3 }).isString().withMessage('Tags must be at least 3 characters long'),
    body('imageUrl', 'Введите ссылку на изображение').optional().isURL().isString().withMessage('Enter a valid URL'),
]
