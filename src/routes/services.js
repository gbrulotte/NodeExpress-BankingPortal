const express = require("express");
const { accounts, writeJSON } = require("../data");

const router = express.Router();

router.get("/transfer", (req, res) => {
  res.render("transfer");
});

router.post("/transfer", (req, res) => {
  const accountFrom = req.body.from;
  const accountTo = req.body.to;
  const transferAmount = req.body.amount;

  accounts[accountFrom].balance -= parseInt(transferAmount);
  accounts[accountTo].balance += parseInt(transferAmount);

  writeJSON();

  res.render("transfer", { message: "Transfer Completed" });
});

router.get("/payment", (req, res) => {
  res.render("payment", { account: accounts.credit });
});

router.post("/payment", (req, res) => {
  accounts.credit.balance -= parseInt(req.body.amount);
  accounts.credit.available += parseInt(req.body.amount);

  writeJSON();

  res.render("payment", { message: "Payment Successful", account: accounts.credit });
});

module.exports = router;
