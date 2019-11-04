/**
 * 儲存一筆資料到 local storage
 * @param {string} key
 * @param {string} addValue
 */
function setItemToStorage (key, addValue)
{
    if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, addValue);
    } else {
        var valueList = localStorage.getItem(key).split('@');
        var addValueIndex = valueList.indexOf(addValue);
        if (addValueIndex > -1) {
            valueList.splice(addValueIndex, 1);
        }
        valueList.unshift(addValue);
        localStorage.setItem(key, valueList.join('@'));
    }
}

/**
 * 從 local Storage 取資料，並刪除本頁產品
 * @param {string} key
 *
 * @return {array}
 */
function getItemsFromStorage (key)
{
    if (localStorage.getItem(key) === null) {
        return;
    }
    
    return localStorage.getItem(key).split('@').filter(function(localStorageItem) {
        return localStorageItem != productId;
    });
}

/**
 * 把 local storage 的紀錄轉成 html
 * @param {string} key
 * @return {string}
 */
function getRecentSeanHtml (key)
{
    var seanList = getItemsFromStorage(key);
    
    var seanHtml = [];
    lists.forEach(function(item, index){
        var seanListIndex = seanList.indexOf(item.id);
        if (seanListIndex > -1) {
            seanHtml[seanListIndex] = '<p>' + item.name + '</p>';
        }
    });
    
    return seanHtml.join('');
}

new Vue({
    el: 'title',
    data: {
        title: 'hahaha',
    }
});

new Vue({
    el: 'nav',
    data: {
        lists: lists
    },
});

new Vue({
    el: '#recentSean',
    data: {
        title: '最近瀏覽過的商品',
        html: getRecentSeanHtml('recentSean'),
    }
});

new Vue({
    el: '#otherSean',
    data: {
        title: '看過此商品的人也看過',
    }
});

setItemToStorage('recentSean', productId);