const matbuhList = [
	{
		id: 1,
		taraf: [
			{
				id: 2,
				price: 2080
			},
			{
				id: 3,
				price: 2200
			},
			{
				id: 6,
				price: 2400
			},
			{
				id: 11,
				price: 2600
			}
		],
		min: 4000
	},
	{
		id: 2,
		taraf: [
			{
				id: 2,
				price: 3600
			},
			{
				id: 3,
				price: 3800
			},
			{
				id: 6,
				price: 4000
			},
			{
				id: 11,
				price: 4200
			}
		],
		min: 6000
	},
	{
		id: 3,
		taraf: [
			{
				id: 2,
				price: 2080
			},
			{
				id: 3,
				price: 2200
			},
			{
				id: 6,
				price: 2400
			},
			{
				id: 11,
				price: 2600
			}
		],
		min: 4000
	},
	{
		id: 4,
		taraf: [
			{
				id: 2,
				price: 2080
			},
			{
				id: 3,
				price: 2200
			},
			{
				id: 6,
				price: 2400
			},
			{
				id: 11,
				price: 2600
			}
		],
		min: 4000
	},
	{
		id: 5,
		taraf: [
			{
				id: 2,
				price: 2320
			},
			{
				id: 3,
				price: 2400
			},
			{
				id: 6,
				price: 2600
			},
			{
				id: 11,
				price: 2800
			}
		],
		min: 4000
	},
	{
		id: 6,
		taraf: [
			{
				id: 2,
				price: 2400
			},
			{
				id: 3,
				price: 2800
			},
			{
				id: 6,
				price: 3000
			},
			{
				id: 11,
				price: 3200
			}
		],
		min: 6000
	},
	{
		id: 7,
		taraf: [
			{
				id: 2,
				price: 2200
			},
			{
				id: 3,
				price: 2300
			},
			{
				id: 6,
				price: 2500
			},
			{
				id: 11,
				price: 2700
			}
		],
		min: 4000
	},
	{
		id: 8,
		taraf: [
			{
				id: 2,
				price: 1600
			},
			{
				id: 3,
				price: 1680
			},
			{
				id: 6,
				price: 1800
			},
			{
				id: 11,
				price: 1920
			}
		]
	},
	{
		id: 9,
		taraf: [
			{
				id: 2,
				price: 3120
			},
			{
				id: 3,
				price: 3200
			},
			{
				id: 6,
				price: 3280
			},
			{
				id: 11,
				price: 3360
			}
		]
	},
	{
		id: 10,
		taraf: [
			{
				id: 2,
				price: 1600
			},
			{
				id: 3,
				price: 1680
			},
			{
				id: 6,
				price: 1800
			},
			{
				id: 11,
				price: 1920
			}
		]
	},
	{
		id: 11,
		taraf: [
			{
				id: 2,
				price: 1600
			},
			{
				id: 3,
				price: 1680
			},
			{
				id: 6,
				price: 1800
			},
			{
				id: 11,
				price: 1920
			}
		]
	},
	{
		id: 12,
		taraf: [
			{
				id: 2,
				price: 1920
			},
			{
				id: 3,
				price: 2000
			},
			{
				id: 6,
				price: 2080
			},
			{
				id: 11,
				price: 2160
			}
		]
	}
]

const percentages = [[0.06, 0.05, 0.04, 0.03, 0.02, 0.015, 0.01, 0.005], [0.09, 0.075, 0.06, 0.045, 0.03, 0.025, 0.015, 0.01]];
const percentageThresholds2023 = [100000, 160000, 260000, 520000, 1560000, 2080000, 4160000, 8840000];
const percentageThresholds2024 = [200000, 320000, 520000, 1040000, 3120000, 4160000, 8320000, 17680000];

function transformLocaleToStandart (num) {
	const numTemp1 = num.replace(/\./g, '')
	const numTemp2 = numTemp1.replace(/,/g, '.')
	return parseFloat(numTemp2)
}

function appendTableRows (income, id, currentMatbuh, uyusmazlik, min) {
	const percentageThresholds = uyusmazlik > 7 ? percentageThresholds2023 : percentageThresholds2024
  	let price = 0;

	const tableBody = document.getElementById("resultTableBody")
	const makbuzBtn = document.getElementById("makbuzGoster")


	// Tüm çocukları silmek için bir döngü kullanın
	while (tableBody.firstChild) {
	  tableBody.removeChild(tableBody.firstChild);
	}
	for (let i = 0; i < percentages[id - 1].length; i++) {
		if (income <= percentageThresholds[i]) {
			price += income * percentages[id - 1][i];
			let incomePercentage = income * percentages[id - 1][i]
			let newTr = document.createElement('tr');
			newTr.innerHTML = `
				<tr>
					<td>${i === 0 ? 'İlk' : 'Sonra Gelen'} ₺${percentageThresholds[i]} için</td>
					<td>%${percentages[id - 1][i] * 100}</td>
					<td>₺${i=== 0 ? (min >= incomePercentage ? min : incomePercentage > currentMatbuh.price ? incomePercentage : currentMatbuh.price) : incomePercentage}</td>
				</tr>
			`
			tableBody.appendChild(newTr)
			break
		} else {
			price += percentageThresholds[i] * percentages[id - 1][i];
			income -= percentageThresholds[i];
			let newTr = document.createElement('tr');
			newTr.innerHTML = `
				<tr>
					<td>${i === 0 ? 'İlk' : 'Sonra Gelen'} ₺${percentageThresholds[i]} için</td>
					<td>%${percentages[id - 1][i] * 100}</td>
					<td>₺${percentageThresholds[i] * percentages[id - 1][i]}</td>
				</tr>
			`
			tableBody.appendChild(newTr)
		}
	}
	let newTr = document.createElement('tr');
	newTr.innerHTML = `
		<tr>
			<td style="font-weight: bold;">Toplam Ücret</td>
			<td></td>
			<td id="toplamUcret" style="font-weight: bold;">₺${price < min ? min : price > currentMatbuh.price ? price : currentMatbuh.price}</td>
		</tr>
	`
	tableBody.appendChild(newTr)
	const makbuz = document.getElementById("makbuz")
	makbuz.classList.remove('invisible');
	makbuzBtn.removeAttribute('disabled');
}

function showMakbuz () {
	const makbuzType = document.getElementById('makbuzType').value
	const priceText = document.getElementById("toplamUcret").textContent
	const price = parseInt(priceText.substr(1))

	const grossTd = document.getElementById('gross')
	const grossLegalTd = document.getElementById('grossLegal')
	const stopajTd = document.getElementById('stopaj')
	const stopajLegalTd = document.getElementById('stopajLegal')
	const netTd = document.getElementById('net')
	const netLegalTd = document.getElementById('netLegal')
	const kdvTd = document.getElementById('kdv')
	const kdvTLegalTd = document.getElementById('kdvLegal')
	const totalTd = document.getElementById('total')
	const totalLegalTd = document.getElementById('totalLegal')

	let gross = null
	let kdv = null
	let stopaj = null
	let net = null
	let total = null
	let grossLegal = null
	let kdvLegal = null
	let stopajLegal = null
	let netLegal = null
	let totalLegal = null
	if (makbuzType == 1) {
		gross = parseFloat(((price * 100) / 120).toFixed(2))
		grossLegal = parseFloat(((price * 100) / 120).toFixed(2))
		stopaj = 0
		stopajLegal = parseFloat((grossLegal * 0.2).toFixed(2))
		net = gross
		netLegal = parseFloat((grossLegal - stopajLegal).toFixed(2))
		kdv = parseFloat((gross * 0.2).toFixed(2))
		kdvLegal = parseFloat((grossLegal * 0.2).toFixed(2))
		total = parseFloat((net + kdv).toFixed(2))
		totalLegal = parseFloat((netLegal + kdvLegal).toFixed(2))
	} else if (makbuzType == 2) {
		gross = parseFloat(((price * 100) / 120).toFixed(2))
		grossLegal = price
		stopaj = 0
		stopajLegal = parseFloat((grossLegal * 0.2).toFixed(2))
		net = gross
		netLegal = parseFloat((grossLegal - stopajLegal).toFixed(2))
		kdv = parseFloat((gross * 0.2).toFixed(2))
		kdvLegal = parseFloat((grossLegal * 0.2).toFixed(2))
		total = parseFloat((net + kdv).toFixed(2))
		totalLegal = parseFloat((netLegal + kdvLegal).toFixed(2))
	} else if (makbuzType == 3) {
		gross = price
		grossLegal = parseFloat(((price * 5) / 4).toFixed(2))
		stopaj = 0
		stopajLegal = parseFloat((grossLegal * 0.2).toFixed(2))
		net = price
		netLegal = parseFloat((grossLegal - stopajLegal).toFixed(2))
		kdv = parseFloat((price * 0.2).toFixed(2))
		kdvLegal = parseFloat((grossLegal * 0.2).toFixed(2))
		total = parseFloat((net + kdv).toFixed(2))
		totalLegal = parseFloat((netLegal + kdvLegal).toFixed(2))
	} else {
		gross = price
		grossLegal = price
		stopaj = 0
		stopajLegal = parseFloat((grossLegal * 0.2).toFixed(2))
		net = price
		netLegal = parseFloat((grossLegal - stopajLegal).toFixed(2))
		kdv = parseFloat((price * 0.2).toFixed(2))
		kdvLegal = parseFloat((grossLegal * 0.2).toFixed(2))
		total = parseFloat((net + kdv).toFixed(2))
		totalLegal = parseFloat((netLegal + kdvLegal).toFixed(2))
	}
	grossTd.innerHTML = '₺' + gross
	grossLegalTd.innerHTML = '₺' + grossLegal 
	stopajTd.innerHTML = '₺' + stopaj 
	stopajLegalTd.innerHTML = '₺' + stopajLegal 
	netTd.innerHTML = '₺' + net 
	netLegalTd.innerHTML = '₺' + netLegal 
	kdvTd.innerHTML = '₺' + kdv 
	kdvTLegalTd.innerHTML = '₺' + kdvLegal 
	totalTd.innerHTML = '₺' + total 
	totalLegalTd.innerHTML = '₺' + totalLegal
}

function submitClick () {
  //
  const uyusmazlik = document.getElementById('uyusmazlik').value
  //
  const arabulucuSayisiList = document.getElementsByName("arabulucuSayisi");
  let arabulucuSayisi;
  for (const radioButton of arabulucuSayisiList) {
    if (radioButton.checked) {
      arabulucuSayisi = radioButton.value;
      break;
    }
  }
  //
  const tarafSayisi = document.getElementById('tarafSayisi').value
  //
  const fiyatLocale = document.getElementById("fiyat").value
	const fiyat = transformLocaleToStandart(fiyatLocale)

  calculate(uyusmazlik, arabulucuSayisi, tarafSayisi, fiyat)
}

function calculate (uyusmazlik, arabulucuSayisi, tarafSayisi, fiyat) {
	const currentMatbuh = matbuhList.find(a => a.id == uyusmazlik).taraf.find(b => b.id == tarafSayisi)
	const min = matbuhList.find (a => a.id == uyusmazlik).min
	appendTableRows(fiyat, arabulucuSayisi, currentMatbuh, uyusmazlik, min)
}

document.addEventListener('DOMContentLoaded', function() {
  const arabulucuSayisiList = document.querySelectorAll('input[name="arabulucuSayisi"]');
  arabulucuSayisiList.forEach(item => {
    item.addEventListener('change', function() {
      if (this.value === '1') {
        document.getElementById("cal-1-ratio").textContent = 6
        document.getElementById("cal-2-ratio").textContent = 5
        document.getElementById("cal-3-ratio").textContent = 4
        document.getElementById("cal-4-ratio").textContent = 3
        document.getElementById("cal-5-ratio").textContent = 2
        document.getElementById("cal-6-ratio").textContent = 1.5
        document.getElementById("cal-7-ratio").textContent = 1
        document.getElementById("cal-8-ratio").textContent = 0.5
      } else if (this.value === '2') {
        document.getElementById("cal-1-ratio").textContent = 9
        document.getElementById("cal-2-ratio").textContent = 7.5
        document.getElementById("cal-3-ratio").textContent = 6
        document.getElementById("cal-4-ratio").textContent = 4.5
        document.getElementById("cal-5-ratio").textContent = 3
        document.getElementById("cal-6-ratio").textContent = 2.5
        document.getElementById("cal-7-ratio").textContent = 1.5
        document.getElementById("cal-8-ratio").textContent = 1
      }
    });
  });
});

$(document).ready(function() {
  $('#fiyat').inputmask({
    alias: 'numeric',
    groupSeparator: '.',
    autoGroup: true,
    digits: 2,
    allowMinus: false,
    rightAlign: false,
    radixPoint: ',',
  });
});