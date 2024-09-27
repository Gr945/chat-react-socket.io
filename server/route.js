const express = require('express');
const router = express.Router();

// @ts-ignore
router.get('/',(_req, res) => {
    res.send('OTPR');
});

module.exports = router;