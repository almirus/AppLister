'use strict';

import {APPLICATION_LIST_URL, OPERATOR_URL, SERVER_INFO_URL, VERSION_INFO_URL} from "./constans";

export function renderServerInfo(domContainer) {
    fetch(SERVER_INFO_URL)
        .then(response => response.json())
        .then(server => {
            let div = createElement('div', 'version content');
            let button = renderMoreButton(`(${server.jdbcUrl})`);
            div.innerHTML =
                `Java version = ${server.javaVersion}<br>
                Tomcat version = ${server.tomcatVersion}<br>
                Oracle version = ${server.oracleVersion}<br>
                jdbc version = ${server.jdbcVersion}<br>
                java OPTS = ${server.javaOPTS}
                `;
            document.getElementById(domContainer).appendChild(button);
            document.getElementById(domContainer).appendChild(div);
        }).catch(err => {
        console.warn('Can\'t get server info.', err);
    });

}

export function renderAppList(domContainer) {
    fetch(APPLICATION_LIST_URL)
        .then(response => response.json())
        .then(appList => {
            let container = document.getElementById(domContainer);
            // цикл по списку
            appList.map(appInfo => {
                let app_row = createElement('h3');
                let appName = appInfo.name;
                app_row.id = appName;
                app_row.innerHTML = `<a title="Open module" href="/${appName}/" target="_blank">${appName}</a>`;
                container.appendChild(app_row); // название приложения
                // дергаем данные для каждого приложения из /actuator/
                fetch(`/..${appInfo.actuatorVersionLink}`)
                    .then(response => response.json())
                    .then(fileVersionInfo => {
                        // в IE нужно отпарсить строку в дату (2020.02.06 17:31:02)
                        const a = fileVersionInfo.compile.time_stamp.split(' ');
                        const d = a[0].split('.');
                        const t = a[1].split(':');
                        let version_span = renderInfoBlock('span', 'version from Actuator', 'version actuator', {
                            installVersion: fileVersionInfo.svn.tag_version,
                            svnVersionInfo: fileVersionInfo.svn.revision,
                            installDate: new Date(+d[0], (+d[1] - 1), +d[2], +t[0], +t[1]),
                        });
                        document.getElementById(appName).appendChild(version_span); // дополняем рядом с названием приложения
                    }).catch(err => {
                    console.warn('Not contain app version.', err);
                });
                // выводятся данные из базы ModuleInfo
                fetch(`${VERSION_INFO_URL}${appInfo.name}`)
                    .then(response => response.json())
                    .then(DbVersionInfo => {
                        let ul = createElement('ul', 'version content');
                        if (DbVersionInfo.length > 0) {
                            // здесь выводим только первую строчку
                            let version = DbVersionInfo.shift();
                            let version_span = renderInfoBlock('span', 'version from ModuleInfo', 'version db', {
                                installVersion: version.installVersion,
                                svnVersionInfo: version.svnVersionInfo,
                                installDate: new Date(version.installDate),
                                operatorId: version.operatorId
                            });
                            document.getElementById(appName).appendChild(version_span); // дополняем рядом с названием приложения
                            // кнопка More (остальные установки приложения)
                            if (DbVersionInfo.length > 1) {
                                let button = renderMoreButton('More...');
                                document.getElementById(appName).appendChild(button);
                            }
                        }
                        // данные для More
                        DbVersionInfo.forEach(version => {
                            let li = renderInfoBlock('li', '', '', {
                                installVersion: version.installVersion,
                                svnVersionInfo: version.svnVersionInfo,
                                installDate: new Date(version.installDate),
                                path: version.svnPath,
                                operatorId: version.operatorId
                            });
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
                let version_span = renderInfoBlock('span', 'war file timestamp', 'version war', {
                    installDate: appInfo.lastModifiedTime == null ? null : new Date(appInfo.lastModifiedTime),
                });
                document.getElementById(appName).appendChild(version_span); // дополняем данными timestamp рядом с названием приложения
            });
        }).catch(err => {
        console.warn('Something went wrong.', err);
    });
}

function renderInfoBlock(domType = 'span', title, className, versionInfo = {}) {
    let element = createElement(domType, className);
    if (Object.values(versionInfo).every(x => (x === null || x === ''))) return document.createTextNode(""); // возвращаем пустой DOM element если нечего рендерить
    if (title) element.title = title;
    let date = versionInfo.installDate ? versionInfo.installDate : undefined;
    element.innerHTML = (versionInfo.installVersion ? versionInfo.installVersion : '') +
                        (versionInfo.svnVersionInfo ? '#' + versionInfo.svnVersionInfo : '')+
                        (versionInfo.installDate ? date.toLocaleDateString()+' '+ date.toLocaleTimeString() : '')+
                        (versionInfo.path ? versionInfo.path : '')+
                        (versionInfo.operatorId ? `<span class="operatorName" data-id="(versionInfo.operatorId)"></span>` : '');
    return element;
}

function renderMoreButton(title = 'More...') {
    let button = document.createElement('button');
    button.className = 'collapsible';
    button.innerText = title;
    button.addEventListener("click", function () {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content)
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
    });
    return button;
}

function createElement(domType, className) {
    let elem = document.createElement(domType);
    if (className) elem.className = className;
    return elem;
}