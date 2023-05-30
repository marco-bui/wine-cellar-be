const config = {
  JWT_SECRET: process.env.JWT_SECRET || 's@cret',
  PORT: process.env.PORT || 3000,
  JWT_EXPIRE_TIME: process.env.JWT_EXPIRE_TIME || '3h',
};

export default config;
