(function () {
    const ACTUATOR_URL = '/actuator/version.json';
    document.addEventListener('DOMContentLoaded', () => {
        fetch('./api/list')
            .then(response => response.json())
            .then(appList => {
                appList.map(appName => {
                    let app_row = document.createElement('h3');
                    app_row.id = appName;
                    app_row.innerHTML = `<a href="/${appName}/" target="_blank">${appName}</a>`;
                    fetch(`/${appName}${ACTUATOR_URL}`)
                        .then(response => response.json())
                        .then(versionInfo => {
                            let version_span = document.createElement('span');
                            version_span.className = 'version';
                            let date = new Date(versionInfo.compile.time_stamp);
                            version_span.innerText = `${versionInfo.svn.tag_version} revision #${versionInfo.svn.revision} (${date.toLocaleDateString()})`;
                            document.getElementById(appName).append(version_span);
                        }).catch(err => {
                        console.warn('Not contain app version.', err);
                    });
                    document.body.append(app_row);
                })
            }).catch(err => {
            console.warn('Something went wrong.', err);
        });
    })
}());