const containers = app => {
    const docker = app.get('docker');
    app.get('/containers', (req, res) => {
        docker.listContainers(function (err, containers) {
            res.send(containers);
        });
    });
};

export { containers };