var reloadData = 30;

var timer;

function updateDataAPI(){

    $.ajax({
        url : 'https://indodax.com/api/summaries',
        success: function(data) {
            var row;
            
            $('#koin1').
// html('<tr><th>Nama Koin</th> <th>Harga Koin Beli </th> <th>Beli</th> <th>Jual</th> <th>Tertinggi 24H</th> <th>Terendah 24h</th> </tr>')

html('<tr><th>Nama Koin</th> <th>Harga Koin Beli</th> <th>Total Long</th> <th>Harga Koin Sekarang</th> <th>Fee beli</th> <th>Long yang didapat</th> <th>Estimasi Pertambahan Volume</th> <th>Total short (sekarang)</th> <th>Fee jika jual</th> <th>Short yang didapat</th> <th>Estimasi Profit awal</th> <th>Estimasi Persen Profit awal</th> <th>Estimasi Profit akhir</th> <th>Estimasi Persen akhir</th> <th>Reduce profit</th> <th>Jumlah Koin</th> </tr>')
            for (var key in data.tickers) {
                if (!['btc_idr','eth_idr'].includes(key)) continue;
                 row = `<tr>
                     <td>` + key.toUpperCase() +    `</td>
                     <td>` +  `<input type="text">`   +` </td>

                     <td>` + formatNumber(data.tickers[key].last) +  `</td>
                     <td>` + formatNumber(data.tickers[key].buy) +  `</td>
                     <td>` + formatNumber(data.tickers[key].sell) +  `</td>
                     <td>` + formatNumber(data.tickers[key].high) +  `</td>
                     <td>` + formatNumber(data.tickers[key].low) +  `</td>
                     <td> - </td>
                     <td> - </td>
                     <td> - </td>
                     <td> - </td>
                     <td> - </td>
                     <td> - </td>
                     <td> - </td>
                     <td> - </td>
                     <td> - </td>
                     
                 </tr>`
                $('#koin1 tr:last').after(row);
            }


            clearTimeout(timer)
            $('#timer').html(reloadData)
            setTimeout(updateDataAPI, reloadData * 1000)
            updateTimer()
        },
        error: function(err) {
            alert("Tidak bisa mengambil data APi")
        }
    })
}

function formatNumber(n) {
    if (n.indexOf('.') > -1)
        return parseFloat(n).toFixed(8);
    else
        return parseInt(n).toLocaleString("id-ID")
}

function updateTimer(){
    a = parseInt($('#timer').html())
    $('#timer').html(a - 1)
    if (a > 0) 
        timer = setTimeout(updateTimer, 1000)
}
updateDataAPI()


function update(){
	var hargaAwal = document.koin.hargaAwal.value;
	var hargaAkhir = document.koin.hargaAkhir.value;
	var totalLong = document.koin.totalLong.value;

// alert("tes");

var feeLong2 = document.getElementById("feeLong");
var feeLong = parseInt(0.001*totalLong);	
feeLong2.innerText = feeLong;

var longFinal2 = document.getElementById("longFinal");
longFinal = parseInt(0.997*totalLong);
longFinal2.innerText = longFinal;

var developVolume2 = document.getElementById("developVolume");
developVolume = Math.round(((hargaAkhir-hargaAwal)/hargaAwal)*100);
developVolume2.innerText = developVolume + " %";

var totalShort2 = document.getElementById("totalShort")
totalShort = parseInt(((developVolume/100)+1)*longFinal);
totalShort2.innerText = totalShort;

var feeShort2 = document.getElementById("feeShort");
feeShort = parseInt(0.001*totalShort);
feeShort2.innerText = feeShort;

var shortFinal2 = document.getElementById("shortFinal");
shortFinal = parseInt(0.997*totalShort);
shortFinal2.innerText = shortFinal;

var profitAwal2 = document.getElementById("profitAwal");
profitAwal = parseInt(totalShort - totalLong);
profitAwal2.innerText = profitAwal;

var persenProfitAwal2 = document.getElementById("persenProfitAwal");
persenProfitAwal = ((profitAwal/totalLong)*100).toFixed(2);
persenProfitAwal2.innerText = persenProfitAwal + " %";

var profitAkhir2 = document.getElementById("profitAkhir");
profitAkhir = parseInt(shortFinal - totalLong);
profitAkhir2.innerText = profitAkhir;

var persenProfitAkhir2 = document.getElementById("persenProfitAkhir");
persenProfitAkhir = ((profitAkhir/totalLong)*100).toFixed(2);
persenProfitAkhir2.innerText = persenProfitAkhir + " %";

var reduceProfit2 = document.getElementById("reduceProfit");
reduceProfit = (((profitAkhir - profitAwal)/totalLong)*100).toFixed(2);
reduceProfit2.innerText = reduceProfit + " %";

var totalKoin2 = document.getElementById("totalKoin");
totalKoin = (longFinal/hargaAwal).toFixed(5);
totalKoin2.innerText = totalKoin;

}

