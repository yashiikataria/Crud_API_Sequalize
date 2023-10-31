var db=require('../models/index')
var User=db.user

//GET
var getUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const pageSize = parseInt(req.query.pageSize) || 2; 
    try {
      const offset = (page - 1) * pageSize;
      const data = await User.findAll({
        limit: pageSize,
        offset: offset,
      });
      const totalCount = await User.count();
      res.status(200).json({
        message: 'Successfully retrieved users',
        data: data,
        page: page,
        pageSize: pageSize,
        totalCount: totalCount,
      });
    } catch (error) {
      res.status(400).json({ message: 'Failed to retrieve users', error: error });
    }
  };
  
//GET BY ID
var getUserById = async (req, res) => {
    try {
      const data = await User.findOne({
        where: {
          id: req.params.id,
        },
      });
  
      if (data) {
        res.status(200).json({ message: 'User found', data: data });
      } else {
        res.status(404).json({ message: 'User with the specified ID does not exist' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Failed to retrieve user', error: error });
    }
  };
  
//POST
var postUsers = async (req, res) => {
    var postData = req.body;
    try {
      if (postData.length > 1) {
        var data = await User.bulkCreate(postData);
      } else {
        var data = await User.create(postData);
      }
      res.status(201).json({ message: 'Entry created successfully', data: data });
    } catch (error) {
      res.status(400).json({ message: 'Failed to create entry', error: error });
    }
  };
//DELETE
var deleteUser = async (req, res) => {
    try {
      const data = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (data > 0) {
        res.status(200).json({ message: 'Entry deleted successfully' });
      } else {
        res.status(404).json({ message: 'Id does not exist' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Failed to delete entry', error: error });
    }
  };

//PATCH
var updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    const [updatedRows] = await User.update(updatedData, {
      where: {
        id: userId,
      },
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'User with the specified ID does not exist' });
    }
    const updatedUser = await User.findByPk(userId);
    res.status(200).json({ message: 'User updated successfully',data: updatedUser });
  }
   catch (error) {
    res.status(400).json({ message: 'Failed to update user', error: error.message });
  }
};

//PUT
var updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User with the specified ID does not exist' });
    }
    const updatedFields = {
      firstName: updatedData.firstName || user.firstName, 
      lastName: updatedData.lastName || user.lastName, 
      age: updatedData.age || user.age, 
      email: updatedData.email || user.email,
    };

    await User.update(updatedFields, {
      where: {
        id: userId,
      },
    });

    const updatedUser = await User.findByPk(userId);
    res.status(200).json({ message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update user', error: error });
  }
};


module.exports={
    getUsers,
    getUserById,
    postUsers,
    deleteUser,
    updateUser,
    updateUserById  
}