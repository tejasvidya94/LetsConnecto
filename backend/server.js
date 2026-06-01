import dotenv from 'dotenv'
dotenv.config();

import { connectDB } from "./src/lib/db.js";
import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";
import app from './src/index.js';
import { server } from './src/lib/socket.io.js';
import path from 'path';
import express from 'express';

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// add react build here to connect frontend to backend.
const __dirname = path.resolve();

app.use(
    express.static(
        path.join(
            __dirname,
            "../frontend/dist"
        )
    )
);

app.use((req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../frontend/dist/index.html"
        )
    );
});

// // production apps do it.
// app.get(/^(?!\/api).*/, (req, res) => {
//     res.sendFile(
//         path.join(
//             __dirname,
//             "../frontend/dist/index.html"
//         )
//     );
// });

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
    connectDB();
});