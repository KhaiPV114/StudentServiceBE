const db = require("../models")

const Device = db.devices

module.exports = {
  getAllDevice: async (req, res) => {
    try {
      const devices = await Device.find();
      res.status(200).json(devices);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy danh sách thiết bị", error });
    }
  },

  getDeviceById: async (req, res) => {
    try {
      const { id } = req.params;
      const device = await Device.findById(id);
      if (!device) {
        return res.status(404).json({ message: "Không tìm thấy thiết bị" });
      }
      res.status(200).json(device);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy thiết bị", error });
    }
  },

  createDevice: async (req, res) => {
    try {
      const { name, quantity, status } = req.body;
      const newDevice = new Device({ name, quantity, status });
      await newDevice.save();
      res.status(201).json({ message: "Thêm thiết bị thành công", device: newDevice });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi thêm thiết bị", error });
    }
  },

  updateDevice: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, quantity, status } = req.body;
      const updated = await Device.findByIdAndUpdate(
        id,
        { name, quantity, status },
        { new: true }
      );
      if (!updated) {
        return res.status(404).json({ message: "Không tìm thấy thiết bị để cập nhật" });
      }
      res.status(200).json({ message: "Cập nhật thành công", device: updated });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi cập nhật thiết bị", error });
    }
  },

  deleteDevice: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Device.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: "Không tìm thấy thiết bị để xóa" });
      }
      res.status(200).json({ message: "Xóa thiết bị thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi xóa thiết bị", error });
    }
  }
};
