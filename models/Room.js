const mongoose = require("mongoose");

// Dữ liệu mẫu (Fake Data)
const roomData = [
  { "name": "DE01", "location": "DELTA" },
  { "name": "DE02", "location": "DELTA" },
  { "name": "DE03", "location": "DELTA" },
  { "name": "DE04", "location": "DELTA" },
  { "name": "DE05", "location": "DELTA" },
  { "name": "DE06", "location": "DELTA" },
  { "name": "DE07", "location": "DELTA" },
  { "name": "DE08", "location": "DELTA" },
  { "name": "DE09", "location": "DELTA" },
  { "name": "DE10", "location": "DELTA" },
  { "name": "DE11", "location": "DELTA" },
  { "name": "DE12", "location": "DELTA" },
  { "name": "DE13", "location": "DELTA" },
  { "name": "DE14", "location": "DELTA" },
  { "name": "DE15", "location": "DELTA" },
  { "name": "BE01", "location": "BETA" },
  { "name": "BE02", "location": "BETA" },
  { "name": "BE03", "location": "BETA" },
  { "name": "BE04", "location": "BETA" },
  { "name": "BE05", "location": "BETA" },
  { "name": "BE06", "location": "BETA" },
  { "name": "BE07", "location": "BETA" },
  { "name": "BE08", "location": "BETA" },
  { "name": "BE09", "location": "BETA" },
  { "name": "BE10", "location": "BETA" },
  { "name": "BE11", "location": "BETA" },
  { "name": "BE12", "location": "BETA" },
  { "name": "BE13", "location": "BETA" },
  { "name": "BE14", "location": "BETA" },
  { "name": "BE15", "location": "BETA" },
  { "name": "AL01", "location": "ALPHA" },
  { "name": "AL02", "location": "ALPHA" },
  { "name": "AL03", "location": "ALPHA" },
  { "name": "AL04", "location": "ALPHA" },
  { "name": "AL05", "location": "ALPHA" },
  { "name": "AL06", "location": "ALPHA" },
  { "name": "AL07", "location": "ALPHA" },
  { "name": "AL08", "location": "ALPHA" },
  { "name": "AL09", "location": "ALPHA" },
  { "name": "AL10", "location": "ALPHA" },
  { "name": "AL11", "location": "ALPHA" },
  { "name": "AL12", "location": "ALPHA" },
  { "name": "AL13", "location": "ALPHA" },
  { "name": "AL14", "location": "ALPHA" },
  { "name": "AL15", "location": "ALPHA" }
];

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Room's name is required"],
      unique: true,
    },
    location: {
      type: String,
      enum: ["ALPHA", "BETA", "DELTA"],
      required: [true, "Room's location is required"],
    },

    // --- BẮT ĐẦU CẬP NHẬT ---
    
    // 1. Trường cho tình trạng phòng
    status: {
      type: String,
      enum: ['available', 'maintenance'], // Chỉ cho phép 2 giá trị này
      default: 'available', // Giá trị mặc định khi tạo phòng mới
    },

    // 2. Trường để gán staff (liên kết tới model User)
    staff: {
      type: mongoose.Schema.Types.ObjectId, // Kiểu dữ liệu ObjectId
      ref: 'User', // Tham chiếu đến model 'User' (từ file models/User.js của bạn)
      default: null, // Mặc định là chưa gán
    }
    
    // --- KẾT THÚC CẬP NHẬT ---
  },
  { timestamps: true }
);

// 2. Định nghĩa hàm Seeder
const seedRooms = async () => {
    try {
        const count = await Room.countDocuments();
        
        if (count === 0) {
            console.log("-> Bắt đầu chèn dữ liệu phòng mẫu...");
            // Thêm status: 'available' vào dữ liệu mẫu
            const roomsWithStatus = roomData.map(room => ({ ...room, status: 'available' }));
            await Room.insertMany(roomsWithStatus);
            console.log(`-> ✅ Đã chèn thành công ${roomsWithStatus.length} phòng.`);
        } else {
            console.log(`-> ⚠️ Đã có ${count} phòng. Bỏ qua bước Seeding.`);
        }
    } catch (error) {
        // Xử lý lỗi trùng lặp/validate nếu có
        console.error('-> ❌ Lỗi khi thực hiện Seeding cho Room:', error.message);
    }
};

const Room = mongoose.model("Room", roomSchema, "rooms");

module.exports = { Room, seedRooms };