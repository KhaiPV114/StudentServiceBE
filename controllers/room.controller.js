const db = require('../models');

// Giả sử db.rooms là Mongoose model cho Room
const Room = db.rooms;

module.exports = {
    // 1. READ ALL (Đã có, tôi bổ sung thêm status code cho hàm res.json)
    getAllRooms: async (req, res) => {
        try {
            // Lấy tất cả phòng
            const rooms = await Room.find();
            // Trả về danh sách phòng
            res.status(200).json(rooms); 
            // Lưu ý: Thông thường, res.json chỉ nhận 1 tham số là body
            // Nếu muốn thêm message, bạn có thể gửi trong body: res.status(200).json({ rooms, message: "Rooms retrieved successfully" });
        } catch (error) {
            // Xử lý lỗi server
            res.status(500).json({ message: error.message });
        }
    },

    // 2. READ ONE - Lấy phòng theo ID
    getRoomById: async (req, res) => {
        try {
            // Lấy ID từ URL params
            const { id } = req.params; 
            
            // Tìm phòng bằng ID
            const room = await Room.findById(id);

            // Kiểm tra nếu không tìm thấy phòng
            if (!room) {
                return res.status(404).json({ message: "Room not found" });
            }

            // Trả về thông tin phòng
            res.status(200).json(room);
        } catch (error) {
            // Xử lý lỗi server hoặc lỗi format ID
            res.status(500).json({ message: error.message });
        }
    },

    // 3. CREATE - Tạo phòng mới
    createRoom: async (req, res) => {
        try {
            // Lấy dữ liệu từ request body (name, location)
            const newRoomData = req.body; 
            
            // Tạo một instance Room mới
            const newRoom = new Room(newRoomData);

            // Lưu vào database
            const savedRoom = await newRoom.save();

            // Trả về phòng đã tạo thành công (Status 201 Created)
            res.status(201).json(savedRoom);
        } catch (error) {
            // Xử lý lỗi validate (thiếu trường, unique, enum) hoặc lỗi server
            res.status(400).json({ message: error.message }); 
        }
    },

    // 4. UPDATE - Cập nhật thông tin phòng
    updateRoom: async (req, res) => {
        try {
            // Lấy ID từ URL params
            const { id } = req.params;
            // Lấy dữ liệu cần cập nhật từ request body
            const updateData = req.body; 

            // Cập nhật phòng và trả về document đã được cập nhật (new: true)
            const updatedRoom = await Room.findByIdAndUpdate(
                id, 
                updateData, 
                { new: true, runValidators: true } // new: true trả về document sau khi update; runValidators: true kiểm tra validation
            );

            // Kiểm tra nếu không tìm thấy phòng
            if (!updatedRoom) {
                return res.status(404).json({ message: "Room not found for update" });
            }

            // Trả về phòng đã cập nhật
            res.status(200).json(updatedRoom);
        } catch (error) {
            // Xử lý lỗi validate hoặc lỗi server
            res.status(400).json({ message: error.message }); 
        }
    },

    // 5. DELETE - Xóa phòng
    deleteRoom: async (req, res) => {
        try {
            // Lấy ID từ URL params
            const { id } = req.params;

            // Xóa phòng
            const deletedRoom = await Room.findByIdAndDelete(id);

            // Kiểm tra nếu không tìm thấy phòng để xóa
            if (!deletedRoom) {
                return res.status(404).json({ message: "Room not found for deletion" });
            }

            // Trả về thông báo thành công (Status 204 No Content thường dùng cho DELETE thành công, hoặc 200 kèm message)
            res.status(200).json({ message: "Room deleted successfully" });
        } catch (error) {
            // Xử lý lỗi server
            res.status(500).json({ message: error.message });
        }
    },
};