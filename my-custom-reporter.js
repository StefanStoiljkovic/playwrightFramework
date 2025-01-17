class MyCustomReporter {
    onBegin(config, suite) {
        console.log(`Tests starts: ${suite.title}`);
    }

    onTestBegin(test) {
        console.log(`Test start: ${test.title}`);
    }

    onTestEnd(test, result) {
        console.log(`Test finished: ${test.title} with status: ${result.status}`);
    }

    onEnd(result) {
        console.log(`ALL TESTS FINISHED WITH STATUS: ${result.status}`);
    }
}

module.exports = MyCustomReporter;