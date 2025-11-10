const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");

/**
 * @swagger
 * tags:
 *   name: Event
 *   description: API quản lý sự kiện (tạo, sửa, xóa, đăng ký, hủy đăng ký)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - location
 *         - date
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của sự kiện
 *           example: 672f12c5e31fbc7b57b1a010
 *         name:
 *           type: string
 *           description: Tên sự kiện
 *           example: Workshop ReactJS
 *         description:
 *           type: string
 *           description: Mô tả nội dung sự kiện
 *           example: Buổi hướng dẫn ReactJS cơ bản cho sinh viên
 *         location:
 *           type: string
 *           description: Địa điểm tổ chức
 *           example: Phòng A101
 *         date:
 *           type: string
 *           format: date-time
 *           description: Ngày giờ tổ chức sự kiện
 *           example: 2025-11-20T08:00:00.000Z
 *         capacity:
 *           type: integer
 *           description: Số lượng người tối đa có thể tham gia
 *           example: 50
 *         participants:
 *           type: array
 *           items:
 *             type: string
 *           description: Danh sách ID người tham gia
 *           example: ["6714c1a8f8e8b21b2b97b0a3", "6714c1bff8e8b21b2b97b0a5"]
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Lấy danh sách tất cả sự kiện
 *     tags: [Event]
 *     responses:
 *       200:
 *         description: Danh sách sự kiện
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *
 *   post:
 *     summary: Tạo mới sự kiện
 *     tags: [Event]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Sự kiện được tạo thành công
 *       400:
 *         description: Thiếu thông tin hoặc sai dữ liệu
 */

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết của một sự kiện
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sự kiện
 *     responses:
 *       200:
 *         description: Thông tin sự kiện
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Không tìm thấy sự kiện
 *
 *   put:
 *     summary: Cập nhật thông tin sự kiện
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sự kiện
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy sự kiện
 *
 *   delete:
 *     summary: Xóa một sự kiện
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sự kiện
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy sự kiện
 */

/**
 * @swagger
 * /events/{eventId}/join:
 *   post:
 *     summary: Người dùng đăng ký tham gia sự kiện
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sự kiện
 *     responses:
 *       200:
 *         description: Đăng ký thành công
 *       400:
 *         description: Người dùng đã đăng ký hoặc dữ liệu không hợp lệ
 */

/**
 * @swagger
 * /events/{eventId}/leave:
 *   post:
 *     summary: Người dùng hủy đăng ký tham gia sự kiện
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sự kiện
 *     responses:
 *       200:
 *         description: Hủy đăng ký thành công
 *       400:
 *         description: Người dùng chưa đăng ký hoặc dữ liệu không hợp lệ
 */

// --- Routes ---
router.post("/", eventController.createEvent);
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);
router.post("/:eventId/join", eventController.joinEvent);
router.post("/:eventId/leave", eventController.leaveEvent);

module.exports = router;
