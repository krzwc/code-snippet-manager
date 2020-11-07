//env variables
["NODE_ENV", "PORT", "DATABASE_URL"].forEach((varName: string) => {
  if (!process.env[varName]) {
    throw new Error(`Environment variable ${varName} is missing`);
  }
});

export default {
  env: process.env.NODE_ENV,
  database: process.env.DATABASE_URL,
  server: {
    port: Number(process.env.PORT)
  }
};
