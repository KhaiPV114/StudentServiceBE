const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket.controller");

/**
 * @swagger
 * tags:
 *   name: Ticket
 *   description: API quản lý vé
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - event
 *       properties:
 *         _id:
 *           type: string
 *           description: "ID của vé"
 *           example: "6740a55be31fbc7b57b1a020"
 *         name:
 *           type: string
 *           description: "Tên vé"
 *           example: "Vé VIP"
 *         price:
 *           type: number
 *           description: "Giá vé"
 *           example: 100000
 *         event:
 *           type: string
 *           description: "ID sự kiện liên quan"
 *           example: "671f12c5e31fbc7b57b1a050"
 *         description:
 *           type: string
 *           description: "Mô tả vé (tùy chọn)"
 *           example: "Vé bao gồm thức ăn và nước uống"
 */

/**
 * @swagger
 * /tickets:
 *   get:
 *     summary: "Lấy danh sách tất cả vé"
 *     tags: [Ticket]
 *     responses:
 *       200:
 *         description: "Danh sách vé"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 *   post:
 *     summary: "Tạo mới một vé"
 *     tags: [Ticket]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       201:
 *         description: "Tạo vé thành công"
 *       400:
 *         description: "Dữ liệu không hợp lệ"
 */

/**
 * @swagger
 * /tickets/{id}:
 *   get:
 *     summary: "Lấy chi tiết một vé theo ID"
 *     tags: [Ticket]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID của vé"
 *     responses:
 *       200:
 *         description: "Thông tin chi tiết vé"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       404:
 *         description: "Không tìm thấy vé"
 *   put:
 *     summary: "Cập nhật thông tin vé"
 *     tags: [Ticket]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID của vé"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       200:
 *         description: "Cập nhật vé thành công"
 *       400:
 *         description: "Dữ liệu không hợp lệ"
 *       404:
 *         description: "Không tìm thấy vé"
 *   delete:
 *     summary: "Xóa vé"
 *     tags: [Ticket]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID của vé"
 *     responses:
 *       200:
 *         description: "Xóa vé thành công"
 *       404:
 *         description: "Không tìm thấy vé"
 */

// Routes
router.get("/", ticketController.getAllTickets);
router.post("/", ticketController.createTicket);
router.get("/:id", ticketController.getTicketById);
router.put("/:id", ticketController.updateTicket);
router.delete("/:id", ticketController.deleteTicket);

module.exports = router;
