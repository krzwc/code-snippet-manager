//env variables
["NODE_ENV", "PORT"].forEach((varName: string) => {
  if (!process.env[varName]) {
    throw new Error(`Environment variable ${varName} is missing`);
  }
});

export default {
  env: process.env.NODE_ENV,
  server: {
    port: Number(process.env.PORT)
  }
};
