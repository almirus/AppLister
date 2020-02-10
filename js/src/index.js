'use strict';
import {renderAppList, renderServerInfo} from "./utils/render";


document.addEventListener('DOMContentLoaded', () => {
    // информация о сервере
    renderServerInfo('serverInfo');
    // список приложений
    renderAppList('applicationList');
});