// ...existing code...
const express = require('express');
const router = express.Router();
const FeedbackController = require('../controllers/feedback.controller');

/**
 * @swagger
 * tags:
 *   - name: Feedbacks
 *     description: Feedback và Phản hồi 
 *
 * components:
 *   schemas:
 *     Reply:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         responderId:
 *           type: string
 *         message:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *     Feedback:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         userId:
 *           type: string
 *         roomId:
 *           type: string
 *         rating:
 *           type: integer
 *         comment:
 *           type: string
 *         replies:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Reply'
 *         status:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /feedbacks:
 *   get:
 *     summary: Lấy tất cả feedbacks
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of feedbacks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Feedback'
 */
router.get('/', FeedbackController.getAllFeedback);

/**
 * @swagger
 * /feedbacks:
 *   post:
 *     summary: Tạo feedback
 *     tags: [Feedbacks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - rating
 *             properties:
 *               userId:
 *                 type: string
 *               roomId:
 *                 type: string
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Feedback created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 */
router.post('/', FeedbackController.createFeedback);

/**
 * @swagger
 * /feedbacks/{id}:
 *   get:
 *     summary: Lấy feedback bằng ID
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Feedback object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 *       404:
 *         description: Feedback not found
 */
router.get('/:id', FeedbackController.getFeedbackById);

/**
 * @swagger
 * /feedbacks/user/{userId}:
 *   get:
 *     summary: Lấy feedback bằng userID
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of feedbacks for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Feedback'
 *       404:
 *         description: No feedback found for this user
 */
router.get('/user/:userId', FeedbackController.getFeedbackByUserId);

/**
 * @swagger
 * /feedbacks/{id}/replies:
 *   post:
 *     summary: Thêm phản hồi 
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Feedback id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - responderId
 *               - message
 *             properties:
 *               responderId:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reply added and feedback returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 */
router.post('/:id/replies', FeedbackController.addReply);

/**
 * @swagger
 * /feedbacks/{id}/replies/{replyId}:
 *   delete:
 *     summary: Xóa phản hồi
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Feedback id
 *       - in: path
 *         name: replyId
 *         required: true
 *         schema:
 *           type: string
 *         description: Reply id
 *     responses:
 *       200:
 *         description: Reply deleted
 *       404:
 *         description: Feedback or reply not found
 */
router.delete('/:id/replies/:replyId', FeedbackController.deleteReply);

/**
 * @swagger
 * /feedbacks/{id}:
 *   delete:
 *     summary: Delete a feedback
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Feedback deleted
 *       404:
 *         description: Feedback not found
 */
router.delete('/:id', FeedbackController.deleteFeedback);

module.exports = router;
// ...existing code...