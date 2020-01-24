(function () {
    document.addEventListener('DOMContentLoaded', () => {
        fetch('./api/list')
            .then(response => response.json())
            .then(appList => {
                appList.map(appInfo => {
                    let app_row = document.createElement('h3');
                    let appName = appInfo.name;
                    app_row.id = appName;
                    app_row.innerHTML = `<a href="/${appName}/" target="_blank">${appName}</a>`;
                    document.body.appendChild(app_row);
                    fetch(`/..${appInfo.actuatorVersionLink}`)
                        .then(response => response.json())
                        .then(versionInfo => {
                            let version_span = document.createElement('span');
                            version_span.className = 'version';
                            let date = new Date(versionInfo.compile.time_stamp);
                            version_span.innerText = `version ${versionInfo.svn.tag_version} revision #${versionInfo.svn.revision} (${date.toLocaleDateString()} ${date.toLocaleTimeString()})`;
                            document.getElementById(appName).appendChild(version_span);
                        }).catch(err => {
                        console.warn('Not contain app version.', err);
                    });
                    let fileDate = new Date(appInfo.lastModifiedTime);
                    let version_span = document.createElement('span');
                    version_span.className = 'version';
                    version_span.innerText = `war file timestamp (${fileDate.toLocaleDateString()} ${fileDate.toLocaleTimeString()})`;
                    document.getElementById(appName).appendChild(version_span);
                })
            }).catch(err => {
            console.warn('Something went wrong.', err);
        });
    })
}());