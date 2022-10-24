var reloadData = 30;

var timer;

function updateDataAPI(){

    $.ajax({
        url : 'https://indodax.com/api/summaries',
        success: function(data) {
            var row;

            
            $('#koinpc').
    html('<td>')
    for (var key in data.tickers) {
        if (!['btc_idr'].includes(key)) continue;
        
            row = formatNumber(data.tickers[key].last) +`</td>`
        $('#koinpc td:last').after(row);
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

