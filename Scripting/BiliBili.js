const path1 = "/x/v2/feed";
const path2 = "/x/v2/view?access_key";
const path3 = "/x/v2/account/mine";
const path4 = "/x/resource/show/tab";

const url = $request.url;
var body = $response.body;
if (url.indexOf(path1) != -1) {
    let obj = JSON.parse(body);
    let items = obj['data']['items'];
    items.forEach((element, index) => {
        if (element.hasOwnProperty("ad_info") || element.hasOwnProperty("banner_item") || element["card_type"] == "three_item_h_v2") {
            items.splice(index,1)
        }
    });
    body = JSON.stringify(obj);
}

if (url.indexOf(path2) != -1) {
    let obj = JSON.parse(body);
    let relates = obj['data']['relates'];
    relates.forEach((element, index) => {
        if (element.hasOwnProperty("is_ad")) {
            relates.splice(index,1)
        }
    });
    delete obj['data']['cms'];
    body = JSON.stringify(obj);
}

if (url.indexOf(path3) != -1) {
    let obj = JSON.parse(body);
    obj['data']['sections'].splice(0,1);
    obj['data']['sections'][0]['items'].splice(3,1);
    obj['data']['sections'][0]['items'].splice(4,3);
    obj['data']['sections'].splice(1,1);
    body = JSON.stringify(obj);
}

if (url.indexOf(path4) != -1) {
    let obj = JSON.parse(body);
    let tab = obj['data']['tab'];
    let bottom = obj['data']['bottom'];
    tab.forEach((element, index) => {
        if (element["name"] != "直播" && element["name"] != "推荐" && element["name"] != "热门" && element["name"] != "追番" && element["name"] != "影视") {
            tab.splice(index,1)
        }
    });
    bottom.forEach((element, index) => {
        if (element["pos"] == 4) {
            bottom.splice(index,1)
        }
    });
    delete obj['data']['top'];
    body = JSON.stringify(obj);
}
$done({body});