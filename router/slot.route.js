const express = require('express');
const slotRouter = express.Router();
const SlotController = require('../controllers/slot.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Slot:
 *       type: object
 *       required:
 *         - slotNumber
 *         - name
 *         - startTime
 *         - endTime
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của slot (khung giờ)
 *           example: 671f12c5e31fbc7b57b1a010
 *         slotNumber:
 *           type: integer
 *           description: Số thứ tự của slot
 *           example: 1
 *         name:
 *           type: string
 *           description: Tên hiển thị của slot
 *           example: Slot 1
 *         startTime:
 *           type: string
 *           description: Thời gian bắt đầu (format HH:MM)
 *           example: 07:30
 *         endTime:
 *           type: string
 *           description: Thời gian kết thúc (format HH:MM)
 *           example: 09:50
 */

/**
 * @swagger
 * /slots:
 *   get:
 *     summary: Lấy danh sách tất cả slot
 *     tags: [Slot]
 *     responses:
 *       200:
 *         description: Danh sách các slot
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Slot'
 */

// Route to get all slots
slotRouter.get('/', SlotController.getAllSlots);
//get slot by id
slotRouter.get('/:id', SlotController.getSlotById);

module.exports = slotRouter;
