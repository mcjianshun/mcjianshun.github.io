// 切换模块函数
function switchModule(module) {
    // 隐藏所有模块
    const modules = document.querySelectorAll('.module');
    modules.forEach(mod => mod.classList.remove('active'));

    // 显示选中的模块
    document.getElementById(module).classList.add('active');
}
//药材价格表
const herbPricesData = {
    //生息药材
    "shengxi": {
        "火精枣": 2000000,
        "地黄参": 2000000,
        "宁心草": 2000000,
        "凝血草": 2000000,
        "红绫草": 2000000,
        "恒心草": 2000000,
        "罗犀草": 2000000,
        "天青花": 2000000,
        "银月花": 2000000,
        "宁神花": 2000000,
        "剑芦": 2000000,
        "七星草": 2000000,
        "五柳根": 2400000,
        "天元果": 2400000,
        "流莹草": 2400000,
        "蛇涎果": 2400000,
        "风灵花": 2400000,
        "伏龙参": 2400000,
        "何首乌": 2400000,
        "夜交藤": 2400000,
        "夏枯草": 2400000,
        "百草露": 2400000,
        "凌风花": 2400000,
        "补天芝": 2400000,
        "紫猴花": 3000000,
        "九叶芝": 3000000,
        "幻心草": 3000000,
        "鬼臼草": 3000000,
        "血莲精": 3500000,
        "鸡冠草": 3500000,
        "银精芝": 3500000,
        "玉髓芝": 3500000,
        "地心火芝": 4500000,
        "天蝉灵叶": 4500000,
        "雪玉骨参": 4500000,
        "腐骨灵花": 4500000,
        "三叶青芝": 6000000,
        "七彩月兰": 6000000,
        "三尾风叶": 6000000,
        "冰灵焰草": 6000000,
        "地心淬灵乳": 7500000,
        "天麻翡石精": 7500000,
        "八角玄冰草": 7500000,
        "奇茸通天菊": 7500000,
        "檀芒九叶花": 9000000,
        "坎水玄冰果": 9000000,
        "剑魄竹笋": 10500000,
        "明心问道果": 10500000
    },
    //非生息药材
    "nonShengxi": {
        "轻灵草": 1500000,
        "龙葵": 1500000,
        "弗兰草": 1500000,
        "玄参": 1500000,
        "枫香脂": 2000000,
        "炼魂珠": 2000000,
        "玄冰花": 2000000,
        "炼血珠": 2000000,
        "菩提花": 2000000,
        "乌稠木": 2000000,
        "雪凝花": 2000000,
        "龙纹草": 2000000,
        "石龙芮": 2500000,
        "锦地罗": 2500000,
        "冰灵果": 2500000,
        "玉龙参": 2500000,
        "天灵果": 2500000,
        "灯心草": 2500000,
        "穿心莲": 2500000,
        "龙鳞果": 2500000,
        "伴妖草": 3000000,
        "剑心竹": 3000000,
        "绝魂草": 3000000,
        "月灵花": 3000000,
        "白沉脂": 3000000,
        "苦曼藤": 3000000,
        "血菩提": 3000000,
        "诱妖草": 3000000,
        "混元果": 3500000,
        "皇龙花": 3500000,
        "天剑笋": 3500000,
        "黑天麻": 3500000,
        "天问花": 3500000,
        "渊血冥花":3500000,
        "芒焰果": 3500000,
        "问道花": 3500000,
        "血玉竹": 4000000,
        "肠蚀草": 4000000,
        "凤血果": 4000000,
        "冰精芝": 4000000,
        "阴阳黄泉花": 4000000,
        "厉魂血珀": 4000000,
        "浩淼水藤": 4000000,
        "道蕴花": 4000000,
        "狼桃": 4500000,
        "霸王花": 4500000,
        "太清玄灵草": 4500000,
        "冥胎骨": 4500000,
        "太乙碧莹花": 4500000,
        "森檀木": 4500000,
        "炼心芝": 4500000,
        "重元换血草": 4500000,
        "地龙干": 5000000,
        "龙须藤": 5000000,
        "鬼面花": 5000000,
        "梧桐木": 5000000
    },
    //特殊药材
    "specialHerbs": {
        "木灵三针花": 9000000,
        "鎏鑫天晶草": 9000000,
        "离火梧桐芝": 10500000,
        "尘磊岩麟果": 10500000
    }
};

// 提取药材信息
function extractInfo(text) {
    //提取药材价格
    function extractHerbPrices(text) {
        const herbPrices = [];
        const namePattern = /名字：([^\n]+?)(?=\s+品级：|$)/g;
        const quantityPattern = /拥有数量：(\d+)/g;

        let nameMatch;
        let quantityMatch;

        // 遍历提取药材信息
        while ((nameMatch = namePattern.exec(text)) !== null && (quantityMatch = quantityPattern.exec(text)) !== null) {
            const herbName = nameMatch[1];
            const quantity = parseInt(quantityMatch[1]);

            // 查找药材价格
            let price = 0;
            let found = false;

            // 首先检查特殊药材
            if (herbPricesData.specialHerbs[herbName]) {
                price = herbPricesData.specialHerbs[herbName];
                found = true;
            }

            // 如果没有找到，再检查生息药材
            if (!found && herbPricesData.shengxi[herbName]) {
                price = herbPricesData.shengxi[herbName];
                found = true;
            }

            // 如果没有找到，再检查非生息药材
            if (!found && herbPricesData.nonShengxi[herbName]) {
                price = herbPricesData.nonShengxi[herbName];
                found = true;
            }

            // 如果找到了价格，创建 HerbPrice 对象并加入到列表
            if (found) {
                herbPrices.push(new HerbPrice(herbName, price, quantity));
            } else {
                // 如果找不到价格，标记为0
                herbPrices.push(new HerbPrice(herbName, 0, quantity));
            }
        }

        herbPrices.sort((a, b) => b.price - a.price);
        let result = '';
        for (const herbPrice of herbPrices) {
            const priceText = `坊市上架 ${herbPrice.name} ${herbPrice.price} ${herbPrice.quantity}`;
            result += `
                <div class="item">
                    <span>${priceText}</span>
                    <button class="copy-button" data-text="${priceText}">复制</button>
                </div>
                `;
        }
        return result;
    }

    class HerbPrice {
        constructor(name, price, quantity) {
            this.name = name;
            this.price = price;
            this.quantity = quantity;
        }
    }

    document.getElementById('herb-info').innerHTML = extractHerbPrices(text);
    //复制按钮逻辑
    document.querySelectorAll('.copy-button').forEach(button => {
        button.addEventListener('click', function () {
            const textToCopy = this.getAttribute('data-text');
            copyToClipboard(textToCopy);
            showNotification('复制成功');
        });
    });
}

// 计算药材背包总价值
function calculateTotalValue() {
    const inputText = document.getElementById('herbValueInput').value;
    const regex = /([\u4e00-\u9fa5]{2,5})\s+\S+\s+数量:\s*(\d+)/g;
    let totalValue = 0;

    // 遍历所有匹配的药材名称和数量
    let match;
    while ((match = regex.exec(inputText)) !== null) {
        const herbName = match[1]; // 药材名称
        const quantity = parseInt(match[2]); // 数量

        let foundPrice = 0;

        // 查找该药材的价格
        foundPrice = findHerbPrice(herbName);
        if (foundPrice) {
            totalValue += foundPrice * quantity; // 累加总价值
        }
    }

    // 格式化总价值
    const formattedValue = formatCurrency(totalValue);
    document.getElementById('result').textContent = `药材背包总价值: ${formattedValue}`;
}

// 查找药材价格
function findHerbPrice(herbName) {
    // 遍历所有药材类别，查找对应的价格
    for (let category in herbPricesData) {
        if (herbPricesData[category].hasOwnProperty(herbName)) {
            return herbPricesData[category][herbName];
        }
    }
    // 如果找不到药材价格，返回 0
    return 0;
}

// 格式化数字为“亿”和“万”格式
function formatCurrency(value) {
    if (value >= 100000000) {
        return `${(value / 100000000).toFixed(2)} 亿`;
    } else if (value >= 10000) {
        return `${(value / 10000).toFixed(2)} 万`;
    } else {
        return `${value} 灵石`;
    }
}

// 将内容复制到剪切板
function copyToClipboard(text) {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
}

// 提示信息
function showNotification(message) {
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        document.body.appendChild(notification);
    }
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

// 提示信息
function showNotification(message) {
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        document.body.appendChild(notification);
    }
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

// 粘贴按钮逻辑
document.getElementById('paste-button1').addEventListener('click', () => {
    navigator.clipboard.readText()
        .then(text => {
            // 处理粘贴内容，移除所有'-'字符
            document.getElementById('user-input').value = text.replace(/-/g, '');
        })
        .catch(err => {
            console.error('无法从剪贴板读取内容: ', err);
        });
});

document.getElementById('paste-button2').addEventListener('click', () => {
    navigator.clipboard.readText()
        .then(text => {
            // 处理粘贴内容，移除所有'-'字符
            document.getElementById('herbValueInput').value = text.replace(/-/g, '');
        })
        .catch(err => {
            console.error('无法从剪贴板读取内容：', err);
        });
});

// 提取按钮逻辑
document.getElementById('process-button').addEventListener('click', function () {
    const userInputText = document.getElementById('user-input').value;
    extractInfo(userInputText);
});

// 清空按钮逻辑
document.getElementById('clear-button1').addEventListener('click', function () {
    document.getElementById('user-input').value = '';
    document.getElementById('herb-info').innerHTML = '';
    document.getElementById('alchemy-info').innerHTML = '';
});

document.getElementById('clear-button2').addEventListener('click', function () {
    document.getElementById('herbValueInput').value = '';
    document.getElementById('result').textContent = '总价值: 0 灵石';
});

// 禁止输入'-'字符
document.getElementById('user-input').addEventListener('input', function (event) {
    let userInputText = event.target.value;

    // 检查是否包含 '-' 字符
    if (userInputText.includes('-')) {
        // 如果有'-'字符，去掉它
        event.target.value = userInputText.replace(/-/g, ''); // 替换掉所有的 '-' 字符
    }
});

// 禁止输入'-'字符
document.getElementById('herbValueInput').addEventListener('input', function (event) {
    let userInputText = event.target.value;

    // 检查是否包含 '-' 字符
    if (userInputText.includes('-')) {
        // 如果有'-'字符，去掉它
        event.target.value = userInputText.replace(/-/g, ''); // 替换掉所有的 '-' 字符
    }
});
