'use strict';
import {createElement, renderMoreButton} from "./utils/render";
import {APPLICATION_LIST_URL, OPERATOR_URL, SERVER_INFO_URL, VERSION_INFO_URL} from "./utils/constans";


document.addEventListener('DOMContentLoaded', () => {
    fetch(SERVER_INFO_URL)
        .then(response => response.json())
        .then(server => {
            let div = createElement('div', 'version content');
            let button = renderMoreButton(`(${server.jdbcUrl})`);
            div.innerHTML = `Java version = ${server.javaVersion}<br>
                Tomcat version = ${server.tomcatVersion}<br>
                Oracle version = ${server.oracleVersion}<br>
                jdbc version = ${server.jdbcVersion}<br>
                java OPTS = ${server.javaOPTS}
                `;
            document.getElementById('serverInfo').appendChild(button);
            document.getElementById('serverInfo').appendChild(div);
        }).catch(err => {
        console.warn('Can\'t get server info.', err);
    });

    fetch(APPLICATION_LIST_URL)
        .then(response => response.json())
        .then(appList => {
            let container = document.getElementById('applicationList');
            appList.map(appInfo => {
                let app_row =  createElement('h3');
                let appName = appInfo.name;
                app_row.id = appName;
                app_row.innerHTML = `<a title="Open module" href="/${appName}/" target="_blank">${appName}</a>`;
                container.appendChild(app_row);
                // выводится данные из /actuator/ и данными из timestamp файла
                fetch(`/..${appInfo.actuatorVersionLink}`)
                    .then(response => response.json())
                    .then(fileVersionInfo => {
                        let version_span = createElement('span','version actuator');
                        version_span.title = 'version from Actuator';
                        let date = new Date(fileVersionInfo.compile.time_stamp);
                        version_span.innerText = `${fileVersionInfo.svn.tag_version} #${fileVersionInfo.svn.revision} (${date.toLocaleDateString()} ${date.toLocaleTimeString()})`;
                        document.getElementById(appName).appendChild(version_span);
                    }).catch(err => {
                    console.warn('Not contain app version.', err);
                });
                // выводятся данные из базы ModuleInfo
                fetch(`${VERSION_INFO_URL}${appInfo.name}`)
                    .then(response => response.json())
                    .then(DbVersionInfo => {
                        let ul = createElement('ul','version content');
                        if (DbVersionInfo.length > 0) {
                            // здесь выводим только первую строчку
                            let version = DbVersionInfo.shift();
                            let span =  createElement('span','version db');
                            span.title = 'version from ModuleInfo';
                            let date = new Date(version.installDate);
                            span.innerHTML = `${version.installVersion} #${version.svnVersionInfo} (${date.toLocaleDateString()} ${date.toLocaleTimeString()})
                                    <span class="operatorName" data-id="${version.operatorId}"></span>`;
                            document.getElementById(appName).appendChild(span);
                            // кнопка More (остальные установки)
                            if (DbVersionInfo.length > 1) {
                                let button = renderMoreButton('More...');
                                document.getElementById(appName).appendChild(button);
                            }
                        }
                        // данные для More
                        DbVersionInfo.forEach(version => {
                            let li = createElement('li');
                            let date = new Date(version.installDate);
                            li.innerHTML = `${version.installVersion} #${version.svnVersionInfo} (${date.toLocaleDateString()} ${date.toLocaleTimeString()})
                                    ${version.svnPath}
                                    <span class="operatorName" data-id="${version.operatorId}"></span>`;
                            ul.appendChild(li);
                            // получаем и выводим operator Name
                            fetch(`${OPERATOR_URL}${version.operatorId}`)
                                .then(response => response.json())
                                .then(operatorInfo => {
                                    // ищем все элементы в DOM c data-id = OperatorId, подменяем на Name
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
                let version_span = createElement('span','version war');
                version_span.title = 'war file timestamp';
                version_span.innerText = `(${fileDate.toLocaleDateString()} ${fileDate.toLocaleTimeString()})`;
                document.getElementById(appName).appendChild(version_span);
            });
        }).catch(err => {
        console.warn('Something went wrong.', err);
    });
});