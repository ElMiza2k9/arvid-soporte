const { ShardingManager } = require('discord.js');

let manager = new ShardingManager('./index.js', {
    token: client.config.token,
    totalShards: 'auto',
});

manager.on('shardCreate', shard => {
    console.log(`[SHARDS]: Lanzado el shard ${shard.id}`)
});

manager.spawn();