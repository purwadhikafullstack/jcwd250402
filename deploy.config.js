module.exports = {
  apps: [
    {
      name: "JCWD-2504-02", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 5402,
      },
      time: true,
    },
  ],
};
