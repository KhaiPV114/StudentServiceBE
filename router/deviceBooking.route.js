const express = require("express");
const deviceBookingRouter = express.Router();
const DeviceBookingController = require("../controllers/deviceBooking.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     DeviceBooking:
 *       type: object
 *       required:
 *         - deviceId
 *         - userId
 *         - borrowDate
 *         - dueDate
 *         - reply
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của phiếu mượn thiết bị
 *           example: 6722b9c4f93a4b2d9a1f8e33
 *         deviceId:
 *           type: string
 *           description: ID của thiết bị
 *           example: 671f12c5e31fbc7b57b1a010
 *         userId:
 *           type: string
 *           description: ID của người mượn
 *           example: 671f23d2a11fbc8b57b1b015
 *         borrowDate:
 *           type: string
 *           format: date
 *           description: Ngày mượn
 *           example: 2025-11-10
 *         dueDate:
 *           type: string
 *           format: date
 *           description: Ngày trả dự kiến
 *           example: 2025-11-15
 *         reply:
 *           type: string
 *           description: Mục đích mượn hoặc ghi chú
 *           example: Mượn cho buổi thuyết trình
 *         status:
 *           type: string
 *           description: Trạng thái mượn thiết bị (PENDING, BOOKED, CANCELLED)
 *           example: PENDING
 */

/**
 * @swagger
 * tags:
 *   name: DeviceBooking
 *   description: Quản lý mượn thiết bị
 */

/**
 * @swagger
 * /device-bookings:
 *   get:
 *     summary: Lấy danh sách tất cả yêu cầu mượn thiết bị
 *     tags: [DeviceBooking]
 *     responses:
 *       200:
 *         description: Danh sách các phiếu mượn thiết bị
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DeviceBooking'
 */
deviceBookingRouter.get("/", DeviceBookingController.getAllDeviceBookings);

/**
 * @swagger
 * /device-bookings/user/{userId}:
 *   get:
 *     summary: Lấy danh sách phiếu mượn theo người dùng
 *     tags: [DeviceBooking]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Danh sách phiếu mượn theo người dùng
 */
deviceBookingRouter.get("/user/:userId", DeviceBookingController.getDeviceBookingsByUser);

/**
 * @swagger
 * /device-bookings/device/{deviceId}:
 *   get:
 *     summary: Lấy danh sách phiếu mượn theo thiết bị
 *     tags: [DeviceBooking]
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của thiết bị
 *     responses:
 *       200:
 *         description: Danh sách phiếu mượn theo thiết bị
 */
deviceBookingRouter.get("/device/:deviceId", DeviceBookingController.getDeviceBookingsByDevice);

/**
 * @swagger
 * /device-bookings:
 *   post:
 *     summary: Tạo yêu cầu mượn thiết bị mới
 *     tags: [DeviceBooking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeviceBooking'
 *     responses:
 *       201:
 *         description: Tạo phiếu mượn thành công
 */
deviceBookingRouter.post("/", DeviceBookingController.createDeviceBooking);

/**
 * @swagger
 * /device-bookings/{id}:
 *   put:
 *     summary: Cập nhật thông tin phiếu mượn thiết bị
 *     tags: [DeviceBooking]
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
 *             $ref: '#/components/schemas/DeviceBooking'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
deviceBookingRouter.put("/:id", DeviceBookingController.updateDeviceBooking);

/**
 * @swagger
 * /device-bookings/{id}:
 *   delete:
 *     summary: Xóa phiếu mượn thiết bị
 *     tags: [DeviceBooking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
deviceBookingRouter.delete("/:id", DeviceBookingController.deleteDeviceBooking);

/**
 * @swagger
 * /device-bookings/{id}/status:
 *   patch:
 *     summary: Cập nhật trạng thái phiếu mượn (BOOKED, CANCELLED, PENDING)
 *     tags: [DeviceBooking]
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
 *             properties:
 *               status:
 *                 type: string
 *                 example: BOOKED
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái thành công
 */
deviceBookingRouter.patch("/:id/status", DeviceBookingController.updateBookingStatus);

module.exports = deviceBookingRouter;
