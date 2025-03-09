# Node clustering example
## Testing clustering
### Visit http://localhost:3000 multiple times.
```
    Handled by worker 12346
    Handled by worker 12347
    Handled by worker 12348
```
### Using curl to test
 - On command promt or powershell
    ```
    for /L %i in (1,1,10) do curl http://localhost:3000
    ```
### Simulate Worker Crash
 - Find a Worker PID from the console output.

 - Terminate it using:

    ``` 
        taskkill /PID <worker_pid> /F 
    ```
 - The console should display:
    ```
        Worker 12346 died, starting a new one...
        Worker 67890 started
    ```
    This confirms worker auto-restart is working.

### Load testing
 - Install autocannon:
    ``` 
        npm install -g autocannon

        autocannon -c 50 -d 10 http://localhost:3000
    ```
    This simulates 50 concurrent users for 10 seconds

### Alternatively we can use pm2 for clustering
 - Instead of manually handling clustering, you can use PM2, which automatically manages clustering.
    ```
        npm install -g pm2
        pm2 start server.js -i max
        pm2 logs
    ```

### About autocannon for load testing
 - When you run autocannon to test your Node.js clustering, it will generate a performance report.
    ```
        npm install -g autocannon
        autocannon -c 50 -d 10 http://localhost:3000
    ```

    This command:
    - -c 50 → Simulates 50 concurrent users.
    - -d 10 → Runs the test for 10 seconds.
    - http://localhost:3000 → URL of your application.

    ```
        Running 10s test @ http://localhost:3000
        50 connections

        Stat        Avg     Stdev   Max
        Latency     10ms    2ms     30ms
        Req/Sec     5000    250     5200
        Bytes/Sec   2 MB    100 KB  2.1 MB

        Latency Distribution
        50%  =  9ms
        75%  =  11ms
        90%  =  15ms
        99%  =  25ms

        Req/Bytes counts sampled once per second

        Requests    [5000, 5050, 4980, 5010, 4950, 5075, 4990, 5005, 5045, 5020]
        Bytes       [2 MB, 2.01 MB, 1.98 MB, 2 MB, 1.97 MB, 2.02 MB, 1.99 MB, 2 MB, 2.03 MB, 2 MB]

        Throughput (Req/Sec) Summary
        min 4950
        max 5075
        avg 5002
        p95 5050
        p99 5070

    ```
### Breaking Down the Results
 - Metric	Meaning
    - Latency	Average time (in milliseconds) taken for a request to be processed. Lower is better.
    - Req/Sec	Number of requests handled per second. Higher is better.
    - Bytes/Sec	Amount of data transferred per second. Useful if your responses contain large payloads.

### Latency Distribution

 - Metric Meaning
    - 50% (Median)	Half the requests were completed in this time or less.
    - 75%	75% of requests were completed within this time.
    - 90%	90% of requests were completed within this time.
    - 99%	99% of requests were completed within this time. If this value is high, it means some requests are slow.

 - How to Use it : 
     - If 90%+ latency is too high, your app might be struggling with load.
     - If latency varies significantly, your app might have inconsistent performance.

 - Requests Per Second (Req/Sec)
    - This shows how many requests the server handled per second over time.
    ``` 
        Requests    [5000, 5050, 4980, 5010, 4950, 5075, 4990, 5005, 5045, 5020]
    ```
    Each value represents the number of requests processed in one second.

### 🛠 How to Use It:
If this number is stable, your server is handling load well.
If this number fluctuates a lot, your server might be struggling.

### Throughput Summary
    - Metric	Meaning
    - min	    Lowest requests per second observed.
    - max	Highest requests per second observed.
    - avg	Average requests per second over the test.
    - p95	95% of the time, the requests were at this level or higher.
    - p99	99% of the time, the requests were at this level or higher.
 - 🛠 How to Use It:
    - If avg, p95, and p99 are close together, your performance is stable.
    - If p99 is much lower than avg, you might have occasional performance spikes or slowdowns.

### How to Improve Performance
 - If autocannon shows low requests per second or high latency, try these:

    - ✅ Enable clustering: If not using cluster, add it.
    - ✅ Increase worker count: Default is os.cpus().length, but you can experiment with fewer/more.
    - ✅ Optimize database queries: Slow DB queries can bottleneck performance.
    - ✅ Use caching: Store frequently accessed data in Redis/memory cache.
    - ✅ Enable gzip compression: Reduce response size using middleware like compression.
    - ✅ Profile memory/CPU usage: Use node --inspect to debug performance issues.

### Running Tests with Different Loads
```
    Light Load: autocannon -c 10 -d 5 http://localhost:3000
    Moderate Load: autocannon -c 100 -d 10 http://localhost:3000
    Heavy Load: autocannon -c 500 -d 30 http://localhost:3000
```
autocannon helps benchmark and optimize your Node.js server performance.

## AWS CICD deployment process
 - Adding soon...


