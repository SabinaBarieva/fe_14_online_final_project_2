const app = require('../server.js');
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
