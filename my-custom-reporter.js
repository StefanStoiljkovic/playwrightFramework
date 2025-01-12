class MyCustomReporter {
    onBegin(config, suite) {
        console.log(`Počinjemo testove: ${suite.title}`);
    }

    onTestBegin(test) {
        console.log(`Počinje test: ${test.title}`);
    }

    onTestEnd(test, result) {
        console.log(`Test završen: ${test.title} sa statusom: ${result.status}`);
    }

    onEnd(result) {
        console.log(`Svi testovi su završeni sa statusom: ${result.status}`);
    }
}

module.exports = MyCustomReporter;