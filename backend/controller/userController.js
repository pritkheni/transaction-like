const { User, Account } = require("../models/db");
const { getJwtToken } = require("../token/jwtToken");
const {
  singupParser,
  singinParser,
  updateParser,
} = require("../validation/zodValidation");

//@desc     handle sign up user
//@route    POST /api/v1/user/signup
//@access   public
exports.singupUser = async (req, res, next) => {
  try {
    const response = singupParser.safeParse(req.body);
    console.log(response);
    if (!response.success) {
      return res.status(409).json({
        success: false,
        message: "Please chek your emial or password",
        data: {},
      });
    }
    const user = await User.findOne({ username: response.data.username });
    console.log(user);
    if (user) {
      return res.status(409).json({
        success: false,
        message: "Email is taken",
        data: {},
      });
    }
    const newUser = await User.create({
      username: response.data.username,
      password: response.data.password,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
    });

    await Account.create({
      userId: newUser._id,
      balance: 1 + Math.random() * 10000,
    });
    const paylodForJwt = {
      userId: newUser._id,
    };
    const jwtToken = getJwtToken(paylodForJwt);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: {
        token: jwtToken,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

//@desc     handle sign in user
//@route    POST /api/v1/user/signin
//@access   public
exports.singinUser = async (req, res, next) => {
  try {
    const response = singinParser.safeParse(req.body);
    if (!response.success) {
      return res.status(400).json({
        success: false,
        message: "Please chek your emial or password",
        data: {},
      });
    }
    const user = await User.findOne({
      username: response.data.username,
      password: response.data.password,
    });
    console.log(user);
    if (user) {
      const paylodForJwt = {
        userId: user._id,
      };
      const jwtToken = getJwtToken(paylodForJwt);
      return res.status(200).json({
        success: true,
        message: "User signin successfully",
        data: {
          token: jwtToken,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    }
    res.status(404).json({
      success: false,
      message: "User not found",
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: {},
    });
  }
};

//@desc     handle update user
//@route    PUT /api/v1/user
//@access   public
exports.updateUser = async (req, res, next) => {
  try {
    const response = updateParser.safeParse(req.body);
    if (!response.success) {
      return req.status(411).json({
        success: false,
        message: "Something went wrong while updating",
        data: {},
      });
    }
    const update = await User.findByIdAndUpdate(req.userId, req.body);
    req.status(200).json({
      success: false,
      message: "User updata successfully",
      data: {},
    });
  } catch (err) {
    return req.status(500).json({
      success: false,
      message: "Internal server error",
      data: {},
    });
  }
};

//@desc     get fillter list by fiel firstName or lastName
//@route    GET /api/v1/user/bulk?filter="yada yada"
//@access   public
exports.filterBulk = async (req, res, next) => {
  try {
    const filter = req.query.filter || "";
    console.log([{ firstName: `/${filter}/` }, { lastName: `/${filter}/` }]);
    const list = await User.find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
    }).select("username firstName lastName _id");
    return res.status(200).json({
      success: true,
      message: `founded user ${list.length}`,
      data: {
        users: list,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: {},
    });
  }
};
