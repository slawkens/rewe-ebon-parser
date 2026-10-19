import { readFileSync, readdirSync } from 'fs';
import { parseEBon } from './index';

async function main() {
    let args = process.argv.slice(2);

    let months: number[] = [];
    //let products = new Map<string, number>();
    for (const file of readdirSync(args[0])) {
        const dataPenny = readFileSync(`${args[0]}/${file}`);
        const receipt = await parseEBon(dataPenny);
        const month = receipt.date.getMonth();

        //console.log(month, receipt.total, receipt.donation ?? 0)
        months[month] = (months[month] ?? 0) + receipt.total + (receipt.donation ?? 0);
        /*
        for (const item of receipt.items) {
            products.set(item.name, (products.get(item.name) ?? 0) + item.subTotal);
        }
        */
    }
/*
    [...products.entries()]
        .sort((a, b) => b[1] - a[1])
        .forEach(([name, total]) => {
            console.log(`${name} -> ${total.toFixed(2)} €`);
        });
*/
    months.forEach((total, month) => {
        const monthName = new Date(2026, month).toLocaleString('default', { month: 'long' });
        const monthPadded = monthName.padStart(9, ' ');

        console.log(`${monthPadded}: ${Math.round(total)} €`);
    });
}

main();