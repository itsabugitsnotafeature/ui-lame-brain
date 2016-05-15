import Mortgage from './mortgage';


document.getElementById('calcBtn').addEventListener('click', () => {
    let principal = 
        document.getElementById("principal").value;
    
    let years = 
        document.getElementById("years").value;
    
    let rate = 
        document.getElementById("rate").value;
    
    let mortgage = new Mortgage(principal, years, rate)

    document.getElementById("monthlyPayment").innerHTML = 
        mortgage.monthlyPayment.toFixed(2);

    document.getElementById("monthlyRate").innerHTML = 
        ( rate * 12).toFixed(2);

    let html = "";
    
    mortgage.amortization.forEach((year, index) => html += `
        <tr>
            <td> ${index + 1} </td>
            <td class="currency"> ${Math.round(year.principalY)} </td>
            <td class="stretch"> 
                <div class="flex">
                    <div class="bar principal"
                        style="flex:${year.intrestY};-webkit-flex:${year.principalY}" >
                    </div>
                    <div class="bar intrest"
                        style="flex:${year.intrestY};-webkit-flex:${year.intrestY}" >
                    </div>
                </div>
            </td>
            <td class="currency left"> ${Math.round(year.intrestY)} </td>
            <td class="currency"> ${Math.round(year.balance)} </td>
        </tr>
        `);

    document.getElementById("amortization").innerHTML = html;
});
