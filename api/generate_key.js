const fetch = require('node-fetch');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { captcha } = req.body;

       
        try {
            const response = await fetch(verificationUrl, { method: 'POST' });
            const data = await response.json();

            if (data.success) {
                // Generate random key (you can modify this as per your requirements)
                const apiKey = Math.random().toString(36).substr(2, 16).toUpperCase();

                // You can replace this with the actual loot link
                const lootLink = `https://example.com/key/${apiKey}`;

                // Return the response
                return res.json({ success: true, link: lootLink, key: apiKey });
            } else {
                return res.status(400).json({ success: false, message: 'Captcha verification failed' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
};
