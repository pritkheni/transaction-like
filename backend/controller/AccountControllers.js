const { Account } = require("../models/db");
const { trasactionParser } = require("../validation/zodValidation");
var mongoose = require("mongoose");

//@desc     get blalance of user
//@route    GET /api/v1/account/balance
//@access   public
exports.getBalance = async (req, res, next) => {
  try {
    const account = await Account.findOne({ userId: req.userId });
    res.status(200).json({
      success: true,
      message: "Fetch successfully",
      data: {
        balance: account.balance,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: {},
    });
  }
};

//@desc     trasfer one account to another account
//@route    GET /api/v1/account/transfer
//@access   public
exports.transfer = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const response = trasactionParser.safeParse(req.body);
    if (!response.success) {
      return res.status(411).json({
        success: false,
        message: "Please give input",
        data: {},
      });
    }
    //first find senders account
    const senderAccount = await Account.findOne({ userId: req.userId }).session(
      session
    );
    if (!senderAccount || senderAccount.balance < response.data.amount) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Insufficient balance",
        data: {},
      });
    }

    //second find to user account
    const toAccount = await Account.findOne({
      userId: response.data.to,
    }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Invalid account",
        data: {},
      });
    }

    //perforn trasfer
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -response.data.amount } }
    ).session(session);

    await Account.updateOne(
      { userId: response.data.to },
      { $inc: { balance: response.data.amount } }
    ).session(session);
    await session.commitTransaction();
    session.endSession();
    return res.status(200).json({
      success: false,
      message: "trasaction completed",
      data: {
        fromBalance: senderAccount.balance,
        toAccountBalance: toAccount.balance,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: {},
    });
  }
};
