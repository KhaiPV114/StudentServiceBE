const express = require('express');
const authRouter = express.Router();
const { AuthController } = require('../controllers');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API xác thực người dùng (đăng ký, đăng nhập)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthRegister:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Tên đăng nhập của người dùng
 *           example: haimon
 *         email:
 *           type: string
 *           description: Email người dùng
 *           example: haimon@example.com
 *         password:
 *           type: string
 *           description: Mật khẩu đăng ký
 *           example: 123456
 *     AuthLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Email đăng nhập
 *           example: haimon@example.com
 *         password:
 *           type: string
 *           description: Mật khẩu đăng nhập
 *           example: 123456
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Đăng ký tài khoản mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRegister'
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Thiếu hoặc sai thông tin đầu vào
 *       500:
 *         description: Lỗi máy chủ
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthLogin'
 *     responses:
 *       200:
 *         description: Đăng nhập thành công, trả về token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Sai email hoặc mật khẩu
 *       500:
 *         description: Lỗi máy chủ
 */

// Route for user registration
authRouter.post('/register', AuthController.register);

// Route for user login
authRouter.post('/login', AuthController.login);

module.exports = authRouter;
