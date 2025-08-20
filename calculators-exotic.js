// calculators-exotic.js

function renderExoticCalculators(id) {
    switch (id) {
        case 'medication_exotic_oral':
            return `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label for="med-exo-weight" class="block text-sm font-medium text-gray-700">体重 (g)</label><input type="number" id="med-exo-weight" class="mt-1 calc-input" placeholder="例: 800"></div>
                    <div><label for="med-exo-dose" class="block text-sm font-medium text-gray-700">投与量 (mg/kg)</label><input type="number" id="med-exo-dose" class="mt-1 calc-input" placeholder="例: 5"></div>
                    <div><label for="med-exo-strength" class="block text-sm font-medium text-gray-700">薬剤の含有量 (mg/錠)</label><input type="number" id="med-exo-strength" class="mt-1 calc-input" placeholder="例: 100"></div>
                    <div><label for="med-exo-drops" class="block text-sm font-medium text-gray-700">1回あたりの目標投与滴下数</label><input type="number" id="med-exo-drops" class="mt-1 calc-input" placeholder="例: 2"></div>
                </div>`;
        case 'medication_exotic_water':
            return `
                <div>
                    <div class="border-b border-gray-200"><nav class="-mb-px flex space-x-8" id="water-med-tabs"><a href="#" class="border-emerald-500 text-emerald-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" data-tab="from_dose">投与量から計算</a><a href="#" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" data-tab="from_conc">目標濃度から計算</a></nav></div>
                    <div id="tab-content-from_dose" class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label for="wm-fd-weight" class="block text-sm font-medium text-gray-700">体重 (g)</label><input type="number" id="wm-fd-weight" class="mt-1 calc-input" placeholder="例: 40"></div>
                        <div><label for="wm-fd-dose" class="block text-sm font-medium text-gray-700">投与量 (mg/kg/日)</label><input type="number" id="wm-fd-dose" class="mt-1 calc-input" placeholder="例: 1"></div>
                        <div><label for="wm-fd-intake-percent" class="block text-sm font-medium text-gray-700">飲水量 (体重の %)</label><input type="number" id="wm-fd-intake-percent" class="mt-1 calc-input" value="10"></div>
                        <div><label for="wm-fd-intake" class="block text-sm font-medium text-gray-700">1日の飲水量 (mL)</label><input type="number" id="wm-fd-intake" class="mt-1 calc-input bg-gray-100" placeholder="自動計算" readonly></div>
                        <div><label for="wm-fd-strength" class="block text-sm font-medium text-gray-700">薬剤の含有量 (mg/錠 or g)</label><input type="number" id="wm-fd-strength" class="mt-1 calc-input" placeholder="例: 10"></div>
                        <div><label for="wm-fd-volume" class="block text-sm font-medium text-gray-700">1包を溶解する水の量 (mL)</label><input type="number" id="wm-fd-volume" class="mt-1 calc-input" placeholder="例: 25"></div>
                        <div><label for="wm-fd-days" class="block text-sm font-medium text-gray-700">投与日数 (日)</label><input type="number" id="wm-fd-days" class="mt-1 calc-input" placeholder="例: 10"></div>
                    </div>
                    <div id="tab-content-from_conc" class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 hidden">
                        <div><label for="wm-fc-conc" class="block text-sm font-medium text-gray-700">目標濃度 (mg/L)</label><input type="number" id="wm-fc-conc" class="mt-1 calc-input" placeholder="例: 10"></div>
                        <div><label for="wm-fc-strength" class="block text-sm font-medium text-gray-700">薬剤の含有量 (mg/錠 or g)</label><input type="number" id="wm-fc-strength" class="mt-1 calc-input" placeholder="例: 10"></div>
                        <div><label for="wm-fc-volume" class="block text-sm font-medium text-gray-700">1包を溶解する水の量 (mL)</label><input type="number" id="wm-fc-volume" class="mt-1 calc-input" placeholder="例: 25"></div>
                        <div><label for="wm-fc-days" class="block text-sm font-medium text-gray-700">投与日数 (日)</label><input type="number" id="wm-fc-days" class="mt-1 calc-input" placeholder="例: 10"></div>
                    </div>
                </div>`;
        default:
            return '';
    }
}

function calculateExotic(id, resultBox) {
    let resultHtml = '';
    switch (id) {
        case 'medication_exotic_oral':
            const med_exo_weight_kg = parseFloat(document.getElementById('med-exo-weight').value) / 1000;
            const med_exo_dose = parseFloat(document.getElementById('med-exo-dose').value);
            const med_exo_strength = parseFloat(document.getElementById('med-exo-strength').value);
            const med_exo_drops = parseFloat(document.getElementById('med-exo-drops').value);

            if ([med_exo_weight_kg, med_exo_dose, med_exo_strength, med_exo_drops].some(isNaN) || med_exo_weight_kg <= 0 || med_exo_strength <= 0 || med_exo_drops <= 0) throw new Error();

            const requiredDoseMg = med_exo_weight_kg * med_exo_dose;
            const doseVolumeMl = med_exo_drops * 0.05; // 1 drop ≈ 0.05mL
            const requiredConc = requiredDoseMg / doseVolumeMl;
            const waterVolume = med_exo_strength / requiredConc;

            resultHtml = `
                <h4 class="font-semibold text-lg mb-2">計算結果</h4>
                <p><strong>1回に必要な薬剤量:</strong> ${requiredDoseMg.toFixed(3)} mg</p>
                <p><strong>目標とする投与液量:</strong> ${doseVolumeMl.toFixed(3)} mL (${med_exo_drops} 滴)</p>
                <p><strong>必要な薬液濃度:</strong> ${requiredConc.toFixed(2)} mg/mL</p>
                <p class="text-xl font-bold mt-2 text-emerald-700"><strong>${med_exo_strength}mgの薬剤1錠</strong>を <strong>${waterVolume.toFixed(2)} mL</strong> の水に溶解してください。</p>
                <h5 class="font-semibold mt-4 mb-1">計算過程</h5>
                <div class="calc-formula">
1回に必要な薬剤量(mg) = 体重(kg) * 投与量(mg/kg)
= ${med_exo_weight_kg.toFixed(3)} * ${med_exo_dose} = ${requiredDoseMg.toFixed(3)}

目標投与液量(mL) = 目標滴下数 * 0.05
= ${med_exo_drops} * 0.05 = ${doseVolumeMl.toFixed(3)}

必要な薬液濃度(mg/mL) = 必要な薬剤量(mg) / 目標投与液量(mL)
= ${requiredDoseMg.toFixed(3)} / ${doseVolumeMl.toFixed(3)} = ${requiredConc.toFixed(2)}

溶解に必要な水の量(mL) = 薬剤の含有量(mg) / 必要な薬液濃度(mg/mL)
= ${med_exo_strength} / ${requiredConc.toFixed(2)} = ${waterVolume.toFixed(2)}
                </div>`;
            resultBox.innerHTML = resultHtml;
            return true;
        case 'medication_exotic_water':
            const activeTab = document.querySelector('#water-med-tabs a.border-emerald-500').dataset.tab;
            if (activeTab === 'from_dose') {
                const wm_fd_weight_kg = parseFloat(document.getElementById('wm-fd-weight').value) / 1000;
                const wm_fd_dose = parseFloat(document.getElementById('wm-fd-dose').value);
                const wm_fd_intake_L = parseFloat(document.getElementById('wm-fd-intake').value) / 1000;
                const wm_fd_strength = parseFloat(document.getElementById('wm-fd-strength').value);
                const wm_fd_volume_L = parseFloat(document.getElementById('wm-fd-volume').value) / 1000;
                const wm_fd_days = parseInt(document.getElementById('wm-fd-days').value);
                
                if ([wm_fd_weight_kg, wm_fd_dose, wm_fd_intake_L, wm_fd_strength, wm_fd_volume_L, wm_fd_days].some(v => isNaN(v) || v <= 0)) throw new Error();

                const dailyDoseMg = wm_fd_weight_kg * wm_fd_dose;
                const targetConc = dailyDoseMg / wm_fd_intake_L;
                const drugPerBottle = targetConc * wm_fd_volume_L;
                const totalDrug = drugPerBottle * wm_fd_days;
                const totalTablets = totalDrug / wm_fd_strength;

                resultHtml = `
                    <h4 class="font-semibold text-lg mb-2">計算結果</h4>
                    <p><strong>目標濃度:</strong> ${targetConc.toFixed(2)} mg/L</p>
                    <p class="text-xl font-bold mt-2 text-emerald-700">薬剤 <strong>${totalTablets.toFixed(2)} 錠(or g)</strong> を <strong>${wm_fd_days}包</strong> に分け、<br>1包を1日1回、飲水 ${wm_fd_volume_L * 1000} mLに混ぜて投与します。</p>
                    <h5 class="font-semibold mt-4 mb-1">計算過程</h5>
                    <div class="calc-formula">
1日の必要薬剤量(mg) = 体重(kg) * 投与量(mg/kg/日) = ${dailyDoseMg.toFixed(3)}
目標濃度(mg/L) = 1日の必要薬剤量(mg) / 1日の飲水量(L) = ${targetConc.toFixed(2)}
1包あたりの薬剤量(mg) = 目標濃度(mg/L) * 溶解する水の量(L) = ${drugPerBottle.toFixed(3)}
総薬剤量(mg) = 1包あたりの薬剤量(mg) * 投与日数 = ${totalDrug.toFixed(3)}
総錠剤数(錠) = 総薬剤量(mg) / 薬剤の含有量(mg) = ${totalTablets.toFixed(2)}
                    </div>`;

            } else { // from_conc
                const wm_fc_conc = parseFloat(document.getElementById('wm-fc-conc').value);
                const wm_fc_strength = parseFloat(document.getElementById('wm-fc-strength').value);
                const wm_fc_volume_L = parseFloat(document.getElementById('wm-fc-volume').value) / 1000;
                const wm_fc_days = parseInt(document.getElementById('wm-fc-days').value);

                if ([wm_fc_conc, wm_fc_strength, wm_fc_volume_L, wm_fc_days].some(v => isNaN(v) || v <= 0)) throw new Error();
                
                const drugPerBottle_fc = wm_fc_conc * wm_fc_volume_L;
                const totalDrug_fc = drugPerBottle_fc * wm_fc_days;
                const totalTablets_fc = totalDrug_fc / wm_fc_strength;

                 resultHtml = `
                    <h4 class="font-semibold text-lg mb-2">計算結果</h4>
                    <p class="text-xl font-bold mt-2 text-emerald-700">薬剤 <strong>${totalTablets_fc.toFixed(2)} 錠(or g)</strong> を <strong>${wm_fc_days}包</strong> に分け、<br>1包を1日1回、飲水 ${wm_fc_volume_L * 1000} mLに混ぜて投与します。</p>
                    <h5 class="font-semibold mt-4 mb-1">計算過程</h5>
                    <div class="calc-formula">
1包あたりの薬剤量(mg) = 目標濃度(mg/L) * 溶解する水の量(L) = ${drugPerBottle_fc.toFixed(3)}
総薬剤量(mg) = 1包あたりの薬剤量(mg) * 投与日数 = ${totalDrug_fc.toFixed(3)}
総錠剤数(錠) = 総薬剤量(mg) / 薬剤の含有量(mg) = ${totalTablets_fc.toFixed(2)}
                    </div>`;
            }
            resultBox.innerHTML = resultHtml;
            return true;
    }
    return false;
}
