const ipfsClient = require('ipfs-http-client');

const projectId = '2IQTRkZAJmKvnV5eGjatnhXWNd1';
const projectSecret = 'a25a611feee305e8c536f32db3be6fe8';
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;

const client = ipfsClient.create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

client.pin.add('QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn').then((res) => {
  console.log(res);
});
