const router = require('express').Router();

const Expense = require('../models/Expense');

const auth = require('../middleware/auth');

const upload = require('../middleware/upload');
const {
  uploadMultiple,
} = require('../services/blobService');

// CREATE EXPENSE
router.post(
  '/',
  auth,
  upload.array('receipts', 5),

  async (req, res) => {

    try {
const imageUrls =
      await uploadMultiple(
        req.files,
        'expenses',
      );
     /*  const imagePaths = req.files.map(file =>
        file.path
      ); */

      const expense =
          await Expense.create({

        ...req.body,

        receiptImages: imageUrls,
      });

      res.json(expense);

    } catch (err) {

      console.log("errer: "+err);

      res.status(500).json({
        msg: "Failed to create expense",
      });
    }
  }
);


// GET SITE EXPENSES
router.get('/:siteId', auth, async (req, res) => {

  try {

    const expenses = await Expense.find({
      siteId: req.params.siteId,
    }).sort({
      expenseDate: -1,
    });

    res.json(expenses);

  } catch (err) {

    res.status(500).json({
      msg: "Failed to fetch expenses",
    });
  }
});


// DELETE
router.delete('/:id', auth, async (req, res) => {

  await Expense.findByIdAndDelete(
    req.params.id,
  );

  res.json({
    msg: "Expense deleted",
  });
});

module.exports = router;
