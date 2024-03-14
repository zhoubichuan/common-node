let sse = (req, res) => {
    if (req.url.includes('message')) {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        })
        res.flushHeaders();
        setInterval(() => {
            const data = {
                message: `Current time is ${new Date().toLocaleTimeString()}`
            };
            res.write(`data: ${JSON.stringify(data)}\n\n`);
        }, 3000);
    }
}
module.exports = sse