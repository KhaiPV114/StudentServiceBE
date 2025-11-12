const express = require('express');
const roomBookingRouter = express.Router();
const { RoomBookingController } = require('../controllers');

/**
 * @swagger
 * tags:
 *   name: RoomBooking
 *   description: API quản lý lượt đặt phòng (đặt, hủy, duyệt, kiểm tra trùng)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RoomBooking:
 *       type: object
 *       required:
 *         - room
 *         - slot
 *         - date
 *         - user
 *       properties:
 *         _id:
 *           type: string
 *           description: "ID của lượt đặt phòng"
 *           example: "6730a55be31fbc7b57b1a011"
 *         room:
 *           type: string
 *           description: "ID của phòng được đặt"
 *           example: "672f12c5e31fbc7b57b1a010"
 *         slot:
 *           type: string
 *           description: "ID của khung giờ được đặt"
 *           example: "671f12c5e31fbc7b57b1a020"
 *         date:
 *           type: string
 *           format: date
 *           description: "Ngày đặt phòng (YYYY-MM-DD)"
 *           example: "2025-11-22"
 *         user:
 *           type: string
 *           description: "ID người đặt phòng"
 *           example: "6714c1a8f8e8b21b2b97b0a3"
 *         status:
 *           type: string
 *           description: "Trạng thái đặt (pending, approved, rejected, cancelled)"
 *           example: "pending"
 *         note:
 *           type: string
 *           description: "Ghi chú (ví dụ: lý do hủy/ghi chú admin)"
 *           example: "Yêu cầu sắp xếp bàn ghế"
 */

/**
 * @swagger
 * /roomBookings:
 *   get:
 *     summary: "Lấy danh sách tất cả lượt đặt phòng"
 *     tags: [RoomBooking]
 *     responses:
 *       200:
 *         description: "Danh sách lượt đặt phòng"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoomBooking'
 *   post:
 *     summary: "Tạo mới một lượt đặt phòng"
 *     tags: [RoomBooking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoomBooking'
 *     responses:
 *       201:
 *         description: "Đặt phòng thành công"
 *       400:
 *         description: "Dữ liệu không hợp lệ hoặc trùng lịch"
 */

/**
 * @swagger
 * /roomBookings/check:
 *   get:
 *     summary: "Kiểm tra trùng/availability cho một booking (query params)"
 *     tags: [RoomBooking]
 *     parameters:
 *       - in: query
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID phòng cần kiểm tra"
 *       - in: query
 *         name: slotId
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID slot (khung giờ)"
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: "Ngày muốn đặt (YYYY-MM-DD)"
 *     responses:
 *       200:
 *         description: "Trả về { available: true/false, reason? }"
 *       400:
 *         description: "Thiếu tham số hoặc sai định dạng"
 */

/**
 * @swagger
 * /roomBookings/{id}:
 *   get:
 *     summary: "Lấy chi tiết một lượt đặt phòng"
 *     tags: [RoomBooking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Thông tin chi tiết lượt đặt phòng"
 *       404:
 *         description: "Không tìm thấy lượt đặt phòng"
 *   delete:
 *     summary: "Hủy một lượt đặt phòng (user)"
 *     tags: [RoomBooking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Hủy đặt phòng thành công"
 *       404:
 *         description: "Không tìm thấy lượt đặt phòng"
 */

/**
 * @swagger
 * /roomBookings/{id}/approve:
 *   post:
 *     summary: "Nhân viên/Quản trị viên duyệt một lượt đặt phòng"
 *     tags: [RoomBooking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note:
 *                 type: string
 *                 description: "Ghi chú khi duyệt"
 *     responses:
 *       200:
 *         description: "Duyệt thành công"
 *       404:
 *         description: "Không tìm thấy lượt đặt phòng"
 *
 * /roomBookings/{id}/reject:
 *   post:
 *     summary: "Nhân viên/Quản trị viên từ chối một lượt đặt phòng"
 *     tags: [RoomBooking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reason
 *             properties:
 *               reason:
 *                 type: string
 *                 description: "Lý do từ chối"
 *     responses:
 *       200:
 *         description: "Từ chối thành công"
 *       400:
 *         description: "Thiếu lý do từ chối"
 *       404:
 *         description: "Không tìm thấy lượt đặt phòng"
 */

/**
 * @swagger
 * /roomBookings/slot/{slotId}:
 *   get:
 *     summary: "Lấy danh sách các lượt đặt phòng theo slotId"
 *     tags: [RoomBooking]
 *     parameters:
 *       - in: path
 *         name: slotId
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID của slot (khung giờ)"
 *     responses:
 *       200:
 *         description: "Danh sách đặt phòng theo slot"
 *       404:
 *         description: "Không tìm thấy slot hoặc không có đặt phòng"
 */

/**
 * @swagger
 * /roomBookings/{userId}/user:
 *   get:
 *     summary: "Lấy danh sách đặt phòng của một người dùng"
 *     tags: [RoomBooking]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID người dùng"
 *     responses:
 *       200:
 *         description: "Danh sách đặt phòng của người dùng"
 *       404:
 *         description: "Không tìm thấy người dùng hoặc không có lượt đặt"
 */

// ⚙️ Routes
roomBookingRouter.get('/check', RoomBookingController.checkDuplicateBooking);
roomBookingRouter.get('/', RoomBookingController.getAllRoomBookings);
roomBookingRouter.post('/', RoomBookingController.createRoomBooking);
roomBookingRouter.get('/:id', RoomBookingController.getRoomBookingById);
roomBookingRouter.post('/:id/cancel', RoomBookingController.cancelRoomBooking);
roomBookingRouter.post('/:id/approve', RoomBookingController.approveBooking);
roomBookingRouter.post('/:id/reject', RoomBookingController.rejectBooking);
roomBookingRouter.get('/slot/:slotId', RoomBookingController.getRoomBookingsBySlotId);
roomBookingRouter.get('/:userId/user', RoomBookingController.getRoomBookingByUserId);

module.exports = roomBookingRouter;
