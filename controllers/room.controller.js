const db = require('../models');

// Giả sử db.rooms là Mongoose model cho Room
const Room = db.rooms; // Đảm bảo db.rooms trỏ đúng đến model Room đã export

module.exports = {
    // 1. READ ALL (Cập nhật để populate 'staff')
    getAllRooms: async (req, res) => {
        try {
            // Thêm .populate('staff') để lấy thông tin chi tiết của staff
            // '-password' để loại bỏ trường password nhạy cảm khỏi kết quả
            const rooms = await Room.find().populate('staff', '-password'); 
            
            res.status(200).json(rooms);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // 2. READ ONE (Cập nhật để populate 'staff')
    getRoomById: async (req, res) => {
        try {
            const { id } = req.params; 
            
            // Thêm .populate('staff')
            const room = await Room.findById(id).populate('staff', '-password');

            if (!room) {
                return res.status(404).json({ message: "Room not found" });
            }

            res.status(200).json(room);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // 3. CREATE - Tạo phòng mới (Giữ nguyên)
    createRoom: async (req, res) => {
        try {
            const newRoomData = req.body; 
            const newRoom = new Room(newRoomData);
            const savedRoom = await newRoom.save();
            res.status(201).json(savedRoom);
        } catch (error) {
            res.status(400).json({ message: error.message }); 
        }
    },

    // 4. UPDATE - Cập nhật thông tin phòng (Giữ nguyên)
    // Hàm này đã có thể xử lý việc cập nhật 'status' và 'staff'
    updateRoom: async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body; 

            const updatedRoom = await Room.findByIdAndUpdate(
                id, 
                updateData, 
                { new: true, runValidators: true }
            );

            if (!updatedRoom) {
                return res.status(404).json({ message: "Room not found for update" });
            }

            // Trả về phòng đã cập nhật (đã populate)
            // Cần populate ở đây nếu muốn thấy staff ngay lập tức
            const populatedRoom = await updatedRoom.populate('staff', '-password');

            res.status(200).json(populatedRoom);
        } catch (error) {
            res.status(400).json({ message: error.message }); 
        }
    },

    // 5. DELETE - Xóa phòng (Giữ nguyên)
    deleteRoom: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedRoom = await Room.findByIdAndDelete(id);

            if (!deletedRoom) {
                return res.status(404).json({ message: "Room not found for deletion" });
            }
            
            res.status(200).json({ message: "Room deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};