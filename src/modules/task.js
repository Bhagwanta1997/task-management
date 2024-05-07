class PubSub {

    subscribe(topic, cb){
        cb(topic)
    }

    publish(topic, state) {
        this.subscribe(topic, state)
    }
}

const pubsub = new PubSub();

pubsub.subscribe('topic-1', (data) => {

  console.log(data, 'from topic 1');

});

 

pubsub.subscribe('topic-1', (data) => {

  console.log(data, 'from topic 1 again');

});

 

pubsub.subscribe('topic-2', (data) => {

  console.log(data, 'from topic 2');

});


pubsub.publish('topic-1', 'foo');

pubsub.publish('topic-2', 'bar');

 

// foo from topic 1

// foo from topic 1 again

// bar from topic 2