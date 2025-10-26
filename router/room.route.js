const express = require('express');
const roomRouter = express.Router();
// Đảm bảo bạn import các hàm controller vừa tạo
const { 
    getAllRooms, 
    getRoomById, 
    createRoom, 
    updateRoom, 
    deleteRoom 
} = require('../controllers/room.controller'); // Giả sử path đúng là: ../controllers/room.controller

// 1. Route to get all rooms (READ ALL)
roomRouter.get('/', getAllRooms); 

// 2. Route to create a new room (CREATE)
roomRouter.post('/', createRoom);

// Các route có :id nên đặt sau route không có :id
// 3. Route to get room by ID (READ ONE)
roomRouter.get('/:id', getRoomById);

// 4. Route to update room by ID (UPDATE)
// Route này sẽ dùng cho cả 2 yêu cầu của bạn
roomRouter.put('/:id', updateRoom);
// Hoặc sử dụng .patch('/:id', updateRoom); nếu bạn muốn cập nhật một phần (partial update)

// 5. Route to delete room by ID (DELETE)
roomRouter.delete('/:id', deleteRoom);


module.exports = roomRouter;