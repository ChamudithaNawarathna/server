const allowedOrigins = [
  'http://localhost:5173',
  'https://yourfrontend.vercel.app',
  // add any other trusted domains
];

const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // CORS preflight
  }

  next(); // Let the request proceed
};

module.exports = corsMiddleware;
