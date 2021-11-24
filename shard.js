const { ShardingManager } = require('discord.js');
require("dotenv").config();

let manager = new ShardingManager('./index.js', {
    token: process.env.token,
    totalShards: 'auto',
});

manager.on('shardCreate', shard => {
    console.log(`[SHARDS]: Lanzado el shard ${shard.id}`)
});

manager.spawn();