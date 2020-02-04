(function () {
    const APPLICATION_LIST = './api/application/list';
    const VERSION_INFO = './api/version/';
    const OPERATOR = './api/operator/';
    document.addEventListener('DOMContentLoaded', () => {
        fetch(APPLICATION_LIST)
            .then(response => response.json())
            .then(appList => {
                appList.map(appInfo => {
                    let app_row = document.createElement('h3');
                    let appName = appInfo.name;
                    app_row.id = appName;
                    app_row.innerHTML = `<a href="/${appName}/" target="_blank">${appName}</a>`;
                    document.body.appendChild(app_row);
                    // выводится данные из /actuator/ и данными из timestamp файла
                    fetch(`/..${appInfo.actuatorVersionLink}`)
                        .then(response => response.json())
                        .then(fileVersionInfo => {
                            let version_span = document.createElement('span');
                            version_span.className = 'version actuator';
                            version_span.title = 'version from Actuator';
                            let date = new Date(fileVersionInfo.compile.time_stamp);
                            version_span.innerText = `${fileVersionInfo.svn.tag_version} #${fileVersionInfo.svn.revision} (${date.toLocaleDateString()} ${date.toLocaleTimeString()})`;
                            document.getElementById(appName).appendChild(version_span);
                        }).catch(err => {
                        console.warn('Not contain app version.', err);
                    });
                    // выводятся данные из базы ModuleInfo
                    fetch(`${VERSION_INFO}${appInfo.name}`)
                        //fetch(`${VERSION_INFO}`)
                        .then(response => response.json())
                        .then(DbVersionInfo => {
                            let ul = document.createElement('ul');
                            ul.className = 'version content';
                            if (DbVersionInfo.length > 0) {
                                let version = DbVersionInfo.shift();
                                let span = document.createElement('span');
                                span.className = 'version db';
                                span.title = 'version from ModuleInfo';
                                let date = new Date(version.installDate);
                                span.innerHTML = `${version.installVersion} #${version.svnVersionInfo} (${date.toLocaleDateString()} ${date.toLocaleTimeString()})
                                    <span class="operatorName" data-id="${version.operatorId}"></span>`;
                                document.getElementById(appName).appendChild(span);
                                if (DbVersionInfo.length > 1) {
                                    let button = document.createElement('button');
                                    button.className = 'collapsible';
                                    button.innerText = 'More';
                                    button.addEventListener("click", function () {
                                        this.classList.toggle("active");
                                        let content = this.nextElementSibling;
                                        if (content.style.maxHeight) {
                                            content.style.maxHeight = null;
                                        } else {
                                            content.style.maxHeight = content.scrollHeight + "px";
                                        }
                                    });
                                    document.getElementById(appName).appendChild(button);
                                }
                            }
                            DbVersionInfo.forEach(version => {
                                let li = document.createElement('li');
                                let date = new Date(version.installDate);
                                li.innerHTML = `${version.installVersion} #${version.svnVersionInfo} (${date.toLocaleDateString()} ${date.toLocaleTimeString()})
                                    ${version.svnPath}
                                    <span class="operatorName" data-id="${version.operatorId}"></span>`;
                                ul.appendChild(li);
                                fetch(`${OPERATOR}${version.operatorId}`)
                                    .then(response => response.json())
                                    .then(operatorInfo => {
                                        Array.from(document.getElementsByClassName('operatorName')).forEach(element => {
                                            if (element.dataset.id == operatorInfo.operatorId) {
                                                element.innerText = operatorInfo.operatorName;
                                            }
                                        });
                                    }).catch(err => {
                                    console.warn('Can\'t get operator info.', err);
                                });
                            });
                            document.getElementById(appName).appendChild(ul);
                        }).catch(err => {
                        console.warn('Can\'t get app version.', err);
                    });

                    let fileDate = new Date(appInfo.lastModifiedTime);
                    let version_span = document.createElement('span');
                    version_span.className = 'version';
                    version_span.innerText = `war file timestamp (${fileDate.toLocaleDateString()} ${fileDate.toLocaleTimeString()})`;
                    document.getElementById(appName).appendChild(version_span);
                });
            }).catch(err => {
            console.warn('Something went wrong.', err);
        });
    })
}());