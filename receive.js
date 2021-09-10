const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (error, connection) => {
  if (error) {
    throw error;
  }
  connection.createChannel((error, channel) => {
    if (error) {
      throw error;
    }
    const queue = "hello-mq";

    channel.assertQueue(queue, {
      durable: true,
    });

    channel.consume(
      queue,
      function (message) {
        console.log(`[x] Recebido: ${message.content.toString()}`);
      },
      { noAck: true }
    );
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 5000);
});
