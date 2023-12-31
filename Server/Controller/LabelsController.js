const db = require('../connectDB')
const { Label } = require('../Model')

const createLabel = (req, res) => {
  const { label_name } = req.body

  const query = 'INSERT INTO Labels (label_name) VALUES (?)'
  db.query(query, [label_name], (err, result) => {
    if (err) {
      console.error('Lỗi thêm label:', err)
      return res.status(500).json({
        status: 500,
        data: null,
        message: 'Lỗi server.',
      })
    }

    res.status(201).json({
      status: 201,
      data: { label_id: result.insertId },
      message: 'Label được tạo thành công.',
    })
  })
}

const readLabels = async (req, res) => {
  try {
    const labels = await Label.findAll() // Lấy tất cả các label từ cơ sở dữ liệu
    res.status(200).json({
      status: 200,
      data: labels,
      message: 'Danh sách label.',
    })
  } catch (error) {
    console.error('Lỗi truy vấn cơ sở dữ liệu:', error)
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Lỗi server.',
    })
  }
}
const updateLabel = (req, res) => {
  const label_id = req.params.label_id
  const { label_name } = req.body
  console.log({
    label_name,
    label_id,
  })

  const query = 'UPDATE Labels SET label_name = ? WHERE label_id = ?'
  db.query(query, [label_name, label_id], (err, result) => {
    if (err) {
      console.error('Lỗi cập nhật label:', err)
      return res.status(500).json({
        status: 500,
        data: null,
        message: 'Lỗi server.',
      })
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: 'Label được cập nhật thành công.',
    })
  })
}
const deleteLabel = (req, res) => {
  const label_id = req.params.label_id

  const query = 'DELETE FROM Labels WHERE label_id = ?'
  db.query(query, [label_id], (err, result) => {
    if (err) {
      console.error('Lỗi xóa label:', err)
      return res.status(500).json({
        status: 500,
        data: null,
        message: 'Lỗi server.',
      })
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: 'Label được xóa thành công.',
    })
  })
}
const searchLabel = (req, res) => {
  const { q } = req.query

  const query = 'SELECT * FROM Labels WHERE label_name LIKE ?'
  db.query(query, [`%${q}%`], (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn label:', err)
      return res.status(500).json({
        status: 500,
        data: null,
        message: 'Lỗi server.',
      })
    }

    res.status(200).json({
      status: 200,
      data: results,
      message: 'Danh sách label tìm kiếm.',
    })
  })
}
const getLabel = async (req, res) => {
  const label_id = req.params.label_id
  try {
    const label = await Label.findByPk(label_id)
    if (label) {
      res.json({
        status: 200,
        data: label,
        message: 'Label retrieved successfully',
      })
    } else {
      res.json({
        status: 400,
        data: null,
        message: 'Label not found',
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 400,
      data: null,
      message: error.message,
    })
  }
}

module.exports = {
  createLabel,
  readLabels,
  updateLabel,
  deleteLabel,
  searchLabel,
  getLabel,
}
