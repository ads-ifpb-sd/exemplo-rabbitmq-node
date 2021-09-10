const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function (error, connection) {
  if (error) {
    throw error;
  }
  connection.createChannel((error, channel) => {
    if (error) {
      throw error;
    }
    const queue = "fila-sd";
    const message = "Hello World";

    channel.assertQueue(queue, {
      durable: true,
    });

    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`[x] Enviado: ${message}`);
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 5000);
});
