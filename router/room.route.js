const express = require('express');
const roomRouter = express.Router();
const { RoomController } = require('../controllers');

/**
 * @swagger
 * tags:
 *   name: Room
 *   description: API quản lý phòng và kiểm tra tình trạng phòng
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       required:
 *         - name
 *         - location
 *         - capacity
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của phòng
 *           example: 672f12c5e31fbc7b57b1a010
 *         name:
 *           type: string
 *           description: Tên phòng
 *           example: A101
 *         location:
 *           type: string
 *           description: Khu vực hoặc tòa nhà chứa phòng
 *           example: Cơ sở chính
 *         capacity:
 *           type: integer
 *           description: Sức chứa tối đa của phòng
 *           example: 40
 */

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Lấy danh sách tất cả phòng
 *     tags: [Room]
 *     responses:
 *       200:
 *         description: Danh sách phòng được trả về
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 */

/**
 * @swagger
 * /rooms/availability/{location}/{slotId}/{date}:
 *   get:
 *     summary: Kiểm tra phòng trống theo địa điểm, slot và ngày
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: location
 *         required: true
 *         schema:
 *           type: string
 *         description: Tên khu vực hoặc cơ sở cần kiểm tra
 *         example: Cơ sở chính
 *       - in: path
 *         name: slotId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của slot (khung giờ)
 *         example: 671f12c5e31fbc7b57b1a010
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Ngày cần kiểm tra (định dạng YYYY-MM-DD)
 *         example: 2025-11-20
 *     responses:
 *       200:
 *         description: Danh sách phòng còn trống
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       404:
 *         description: Không tìm thấy phòng phù hợp
 */

// --- Routes ---
roomRouter.get('/', RoomController.getAllRooms);
roomRouter.get('/availability/:location/:slotId/:date', RoomController.getRoomAvailability);

module.exports = roomRouter;
