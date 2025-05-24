const { Worker } = require("worker_threads");

function runWorker(number) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", {
      workerData: number,
    });

    worker.on("message", (result) => {
      resolve(result);
    });

    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

console.log("Main thread starting...");

const start = Date.now();

runWorker(44)
  .then((result) => {
    const end = Date.now();
    console.log(`Result from worker thread: ${result}`);
    console.log(`Time taken: ${(end - start) / 1000}s`);
  })
  .catch((err) => console.error("Worker error:", err));

setTimeout(() => {
  console.log("Main thread work done.");
}, 1000);
