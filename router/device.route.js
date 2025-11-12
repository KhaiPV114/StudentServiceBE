const express = require("express");
const deviceRouter = express.Router();
const DeviceController = require("../controllers/device.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Device:
 *       type: object
 *       required:
 *         - name
 *         - quantity
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của thiết bị
 *           example: 6721b6d3e3c9a5c55b1e7c20
 *         name:
 *           type: string
 *           description: Tên thiết bị
 *           example: Máy chiếu Epson EB-X41
 *         quantity:
 *           type: integer
 *           description: Số lượng thiết bị
 *           example: 10
 *         status:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Device
 *   description: Quản lý thiết bị
 */

/**
 * @swagger
 * /devices:
 *   get:
 *     summary: Lấy danh sách tất cả thiết bị
 *     tags: [Device]
 *     responses:
 *       200:
 *         description: Danh sách các thiết bị
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Device'
 */
deviceRouter.get("/", DeviceController.getAllDevice);

/**
 * @swagger
 * /devices/{id}:
 *   get:
 *     summary: Lấy thông tin thiết bị theo ID
 *     tags: [Device]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của thiết bị
 *     responses:
 *       200:
 *         description: Thiết bị được tìm thấy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *       404:
 *         description: Không tìm thấy thiết bị
 */
deviceRouter.get("/:id", DeviceController.getDeviceById);

/**
 * @swagger
 * /devices:
 *   post:
 *     summary: Thêm thiết bị mới
 *     tags: [Device]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Device'
 *     responses:
 *       201:
 *         description: Thêm thiết bị thành công
 *       500:
 *         description: Lỗi khi thêm thiết bị
 */
deviceRouter.post("/", DeviceController.createDevice);

/**
 * @swagger
 * /devices/{id}:
 *   put:
 *     summary: Cập nhật thông tin thiết bị
 *     tags: [Device]
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
 *             $ref: '#/components/schemas/Device'
 *     responses:
 *       200:
 *         description: Cập nhật thiết bị thành công
 *       404:
 *         description: Không tìm thấy thiết bị để cập nhật
 */
deviceRouter.put("/:id", DeviceController.updateDevice);

/**
 * @swagger
 * /devices/{id}:
 *   delete:
 *     summary: Xóa thiết bị
 *     tags: [Device]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thiết bị thành công
 *       404:
 *         description: Không tìm thấy thiết bị để xóa
 */
deviceRouter.delete("/:id", DeviceController.deleteDevice);

module.exports = deviceRouter;
