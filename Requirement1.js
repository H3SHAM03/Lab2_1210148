var inventory = [], transactions = [], categories = [], fields = {};

function getItem(name){
    const index = inventory.findIndex((item) => item.name === name);
    if (index === 1){
        return -1
    }
    return inventory[index]
}

function add(name,category,quantity,price,unit,date,customField) {
    var item = { name: name, category: category, quantity: quantity, price: price, unit: unit, date: new Date(), customField: customField || {} };
    inventory.push(item);
    if (!categories.includes(category)) {
        categories.push(category);
    }
    transactions.push({ type: "add", item });
}

function edit(name,category,quantity,price,unit,date,customField) {
    if (getItem(name) != -1) {
    var item = { name: name, category: category, quantity: quantity, price: price, unit: unit, date: new Date(), customField: customField || {} };
    transactions.push({ type: "edit", old: inventory[operationDetails[0]], new: item });
    inventory[name] = item;
    }
}

function remove(name){
    if (getItem(name) != -1) {
        transactions.push({ type: "delete", item: inventory[name] });
        inventory.splice(name, 1);
    }
    alert(`ALERT: Item ${item.name} was removed from inventory`)
}

function sale(name,quantity){
    item = getItem(name)
    if (item === -1 || !(item.quantity >= operationDetails[1])){
        return
    }
    item.quantity -= quantity;
    transactions.push({ type: "sale", item: item, saleQuantity: quantity, date: new Date() });
    console.log(`Sold ${quantity} ${item.unit} of ${item.name}`);
    if (item.quantity < 10){
        alert(`ALERT: Item ${item.name} is below 10 units! Current quantity: ${item.quantity}`)
    }
}

function restock(name,quantity){
    item = getItem(name)
    if (item === -1){
        return
    }
    item.quantity += quantity;
    transactions.push({ type: "restock", item: item, restockQuantity: quantity, date: new Date() });
    console.log(`Restocked ${quantity} ${item.unit} of ${item.name}`);
}

function search(operationDetails){
    console.log(inventory.filter(x => [x.name, x.category, x.price].some(v => v.toString().toLowerCase().includes(operationDetails[0].toLowerCase()))));
}

function viewInventory(){
    console.log("=== Inventory ===", inventory);
}

function exportAll(){
    console.log("CSV:\n" + ["Name,Category,Quantity,Price,Unit,AddedAt"].concat(inventory.map(x => Object.values(x).join(','))).join('\n'));
}

function viewAllTransactions(){
    console.log("Transactions:\n", transactions);
}

function viewInventoryAge(){
    console.log(inventory.map(x => `${x.name}: ${Math.floor((new Date() - new Date(x.date)) / (1000 * 60 * 60 * 24))}d`).join('\n'));
}

function importData(operationDetails){
    operationDetails[0].forEach(x => add([x.name, x.category, x.quantity, x.price, x.unit]));
}

function addField(operationDetails){
    // if (!fields[operationDetails[0]]) fields[operationDetails[0]] = null;
    if (!fields[operationDetails[0]]){
        fields.push(operationDetails[0])
    }
}

function findItemByCustomField(operationDetails){
    inventory.find(x => x.name === operationDetails[0])?.customField[operationDetails[1]] = operationDetails[2];
}