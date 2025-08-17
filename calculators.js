// calculators.js

/**
 * 指定されたIDに基づいて計算ツールのUIを描画し、イベントリスナーを設定します。
 * @param {string} title - 計算ツールのタイトル
 * @param {string} id - 計算ツールのユニークID
 */
function renderCalculator(title, id) {
    const detailContent = document.getElementById('detail-content');
    if (!detailContent) return;

    let html = `<h2 class="text-3xl font-bold text-gray-800 mb-6">${title}</h2>`;
    html += `<div id="calc-${id}" class="space-y-4">`;

    // --- 各計算ツールのHTMLを生成 ---
    switch (id) {
        case 'calorie_dogcat_detailed':
            html += `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                    <div><label for="species" class="block text-sm font-medium text-gray-700">動物種</label>
                        <select id="species" class="mt-1 calc-input">
                            <option value="dog">犬</option>
                            <option value="cat">猫</option>
                        </select>
                    </div>
                    <div><label for="bw_kg" class="block text-sm font-medium text-gray-700">体重 (kg)</label>
                        <input type="number" id="bw_kg" class="mt-1 calc-input" placeholder="例: 10">
                    </div>
                    <div><label for="purpose" class="block text-sm font-medium text-gray-700">目的 / ライフステージ</label>
                        <select id="purpose" class="mt-1 calc-input">
                            <option value="maintenance">成犬/成猫 (維持)</option>
                            <option value="growth">成長期</option>
                            <option value="weight_loss">減量</option>
                            <option value="gestation">妊娠期</option>
                            <option value="lactation">授乳期</option>
                            <option value="critical_care">入院 / クリティカル</option>
                        </select>
                    </div>
                    <div id="maintenance-options" class="">
                        <label for="neuter_status" class="block text-sm font-medium text-gray-700">避妊/去勢</label>
                        <select id="neuter_status" class="mt-1 calc-input">
                            <option value="neutered">去勢済</option>
                            <option value="intact">未去勢</option>
                        </select>
                        <div class="mt-4"><label class="flex items-center"><input type="checkbox" id="obesity_prone" class="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500">
                        <span class="ml-2 text-sm text-gray-600">肥満傾向 / 低活動</span></label></div>
                    </div>
                    <div id="growth-options" class="hidden">
                        <label for="age_stage" class="block text-sm font-medium text-gray-700">成長段階</label>
                        <select id="age_stage" class="mt-1 calc-input">
                            <option value="puppy_young">&lt; 4ヶ月齢 (犬)</option>
                            <option value="puppy_old">&ge; 4ヶ月齢 (犬)</option>
                            <option value="kitten">子猫</option>
                        </select>
                    </div>
                    <div id="lactation-options" class="hidden">
                        <label for="litter_size" class="block text-sm font-medium text-gray-700">子の数 (頭)</label>
                        <input type="number" id="litter_size" class="mt-1 calc-input" placeholder="例: 3">
                    </div>
                    <div>
                        <label for="rer_formula" class="block text-sm font-medium text-gray-700">RER計算式</label>
                        <select id="rer_formula" class="mt-1 calc-input">
                            <option value="exponential">指数式: 70 * (体重^0.75)</option>
                            <option value="linear">線形式: 30 * 体重 + 70</option>
                        </select>
                        <p class="text-xs text-gray-500 mt-1">線形式は2-45kgでの使用を推奨</p>
                    </div>
                    <div><label for="food_density" class="block text-sm font-medium text-gray-700">フードのカロリー (kcal/100g)</label>
                        <input type="number" id="food_density" class="mt-1 calc-input" placeholder="例: 380">
                    </div>
                </div>
            `;
            break;
        case 'bsa':
             html += `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label for="bsa-species" class="block text-sm font-medium text-gray-700">動物種</label><select id="bsa-species" class="mt-1 calc-input"><option value="dog">犬</option><option value="cat">猫</option></select></div>
                    <div><label for="bsa-weight" class="block text-sm font-medium text-gray-700">体重 (kg)</label><input type="number" id="bsa-weight" class="mt-1 calc-input" placeholder="例: 10"></div>
                </div>`;
            break;
        case 'transfusion':
            html += `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div><label for="tf-species" class="block text-sm font-medium text-gray-700">受血動物</label>
                        <select id="tf-species" class="mt-1 calc-input"><option value="dog">犬</option><option value="cat">猫</option></select>
                    </div>
                    <div>
                        <label for="tf-blood-volume" class="block text-sm font-medium text-gray-700">循環血液量 (mL/kg)</label>
                        <input type="number" id="tf-blood-volume" class="mt-1 calc-input" value="90">
                        <div id="tf-blood-volume-info" class="text-xs text-gray-500 mt-1"></div>
                    </div>
                    <div><label for="tf-weight" class="block text-sm font-medium text-gray-700">受血動物の体重 (kg)</label>
                        <input type="number" id="tf-weight" class="mt-1 calc-input" placeholder="例: 20">
                    </div>
                    <div><label for="tf-patient-pcv" class="block text-sm font-medium text-gray-700">現在PCV (%)</label>
                        <input type="number" id="tf-patient-pcv" class="mt-1 calc-input" placeholder="例: 15">
                    </div>
                    <div><label for="tf-target-pcv" class="block text-sm font-medium text-gray-700">目標PCV (%)</label>
                        <input type="number" id="tf-target-pcv" class="mt-1 calc-input" placeholder="例: 25">
                    </div>
                    <div><label for="tf-donor-pcv" class="block text-sm font-medium text-gray-700">ドナーPCV (%)</label>
                        <input type="number" id="tf-donor-pcv" class="mt-1 calc-input" placeholder="例: 40">
                    </div>
                </div>`;
            break;
        case 'cri_gamma':
             html += `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label for="cri-g-conc" class="block text-sm font-medium text-gray-700">薬剤濃度 (mg/mL)</label><input type="number" id="cri-g-conc" class="mt-1 calc-input" placeholder="例: 20"></div>
                    <div><label for="cri-g-weight" class="block text-sm font-medium text-gray-700">体重 (kg)</label><input type="number" id="cri-g-weight" class="mt-1 calc-input" placeholder="例: 5"></div>
                    <div><label for="cri-g-rate" class="block text-sm font-medium text-gray-700">点滴流量 (mL/hr)</label><input type="number" id="cri-g-rate" class="mt-1 calc-input" placeholder="例: 10"></div>
                    <div><label for="cri-g-total-vol" class="block text-sm font-medium text-gray-700">輸液全体量 (mL)</label><input type="number" id="cri-g-total-vol" class="mt-1 calc-input" placeholder="例: 250"></div>
                    <div><label for="cri-g-dose" class="block text-sm font-medium text-gray-700">投与量 (μg/kg/min)</label><input type="number" id="cri-g-dose" class="mt-1 calc-input" placeholder="例: 5"></div>
                </div>`;
            break;
        case 'medication_exotic_oral':
            html += `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label for="med-exo-weight" class="block text-sm font-medium text-gray-700">体重 (g)</label><input type="number" id="med-exo-weight" class="mt-1 calc-input" placeholder="例: 800"></div>
                    <div><label for="med-exo-dose" class="block text-sm font-medium text-gray-700">投与量 (mg/kg)</label><input type="number" id="med-exo-dose" class="mt-1 calc-input" placeholder="例: 5"></div>
                    <div><label for="med-exo-strength" class="block text-sm font-medium text-gray-700">薬剤の含有量 (mg/錠)</label><input type="number" id="med-exo-strength" class="mt-1 calc-input" placeholder="例: 100"></div>
                    <div><label for="med-exo-drops" class="block text-sm font-medium text-gray-700">1回あたりの目標投与滴下数</label><input type="number" id="med-exo-drops" class="mt-1 calc-input" placeholder="例: 2"></div>
                </div>`;
            break;
        case 'medication_exotic_water':
            html += `
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
            break;
    }

    html += `<div id="calc-result-${id}" class="calc-result-box hidden"></div></div>`;
    detailContent.innerHTML = html;

    // --- イベントリスナーを設定 ---
    const calcContainer = document.getElementById(`calc-${id}`);
    if (calcContainer) {
        calcContainer.addEventListener('input', () => calculate(id));
        if (id === 'calorie_dogcat_detailed') {
            document.getElementById('purpose').addEventListener('change', updateCalculatorUI);
            document.getElementById('species').addEventListener('change', updateCalculatorUI);
            updateCalculatorUI();
        }
        if (id === 'transfusion') {
            document.getElementById('tf-species').addEventListener('change', () => updateTransfusionUI(id));
            updateTransfusionUI(id);
        }
        if (id === 'medication_exotic_water') {
            const weightInput = document.getElementById('wm-fd-weight');
            const percentInput = document.getElementById('wm-fd-intake-percent');
            
            const updateWaterIntake = () => {
                const weight = parseFloat(weightInput.value);
                const percent = parseFloat(percentInput.value);
                const intakeInput = document.getElementById('wm-fd-intake');
                if (!isNaN(weight) && !isNaN(percent)) {
                    intakeInput.value = (weight * (percent / 100)).toFixed(2);
                } else {
                    intakeInput.value = '';
                }
                calculate(id);
            };

            weightInput.addEventListener('input', updateWaterIntake);
            percentInput.addEventListener('input', updateWaterIntake);
            
            document.getElementById('water-med-tabs').addEventListener('click', (e) => {
                e.preventDefault();
                const tab = e.target.closest('a');
                if (!tab) return;
                document.querySelectorAll('#water-med-tabs a').forEach(t => {
                    t.classList.remove('border-emerald-500', 'text-emerald-600');
                    t.classList.add('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300');
                });
                tab.classList.add('border-emerald-500', 'text-emerald-600');
                tab.classList.remove('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300');
                document.getElementById('tab-content-from_dose').classList.toggle('hidden', tab.dataset.tab !== 'from_dose');
                document.getElementById('tab-content-from_conc').classList.toggle('hidden', tab.dataset.tab !== 'from_conc');
                calculate(id);
            });
        }
    }
}


/**
 * カロリー計算ツールのUIオプション（表示/非表示）を更新します。
 */
function updateCalculatorUI() {
    const purpose = document.getElementById('purpose').value;
    const species = document.getElementById('species').value;

    document.getElementById('maintenance-options').classList.toggle('hidden', purpose !== 'maintenance');
    document.getElementById('growth-options').classList.toggle('hidden', purpose !== 'growth');
    document.getElementById('lactation-options').classList.toggle('hidden', purpose !== 'lactation');
    
    if (purpose === 'growth') {
        const ageStageSelect = document.getElementById('age_stage');
        ageStageSelect.querySelector('option[value="puppy_young"]').disabled = (species === 'cat');
        ageStageSelect.querySelector('option[value="puppy_old"]').disabled = (species === 'cat');
        ageStageSelect.querySelector('option[value="kitten"]').disabled = (species === 'dog');
        if (species === 'cat') {
            ageStageSelect.value = 'kitten';
        } else if (ageStageSelect.value === 'kitten') {
            ageStageSelect.value = 'puppy_young';
        }
    }
}


/**
 * 輸血量計算ツールの循環血液量のデフォルト値と説明を更新します。
 * @param {string} calculatorId - 計算ツールのID
 */
function updateTransfusionUI(calculatorId) {
    const species = document.getElementById('tf-species').value;
    const bloodVolumeInput = document.getElementById('tf-blood-volume');
    const infoDiv = document.getElementById('tf-blood-volume-info');
    
    if (species === 'dog') {
        bloodVolumeInput.value = 90;
        infoDiv.innerHTML = '<b>約 80–90 mL/kg:</b> 大型犬やスポーツ犬ではやや多め。成書・血液バンク指針ともにこの範囲を採用。';
    } else { // cat
        bloodVolumeInput.value = 60;
        infoDiv.innerHTML = '<b>約 50–60 mL/kg:</b> 小型動物は体重あたり血液量が少なめ。ISFMなどでは55-60mL/kgを基準にすることが多い。';
    }
    calculate(calculatorId);
}

/**
 * 指定されたIDの計算を実行し、結果を表示します。
 * @param {string} id - 計算ツールのユニークID
 */
function calculate(id) {
    const resultBox = document.getElementById(`calc-result-${id}`);
    if (!resultBox) return;
    let resultHtml = '';
    
    try {
         switch(id) {
            case 'calorie_dogcat_detailed':
                const species = document.getElementById('species').value;
                const bw_kg = parseFloat(document.getElementById('bw_kg').value);
                if (isNaN(bw_kg) || bw_kg <= 0) throw new Error();
                
                const purpose = document.getElementById('purpose').value;
                const rer_formula = document.getElementById('rer_formula').value;
                const food_density = parseFloat(document.getElementById('food_density').value);

                let rer = 0;
                let rer_formula_text = '';
                if (rer_formula === 'exponential' || bw_kg < 2 || bw_kg > 45) {
                    rer = 70 * Math.pow(bw_kg, 0.75);
                    rer_formula_text = `RER = 70 * (${bw_kg}^0.75) = ${rer.toFixed(1)} kcal/日`;
                } else {
                    rer = 30 * bw_kg + 70;
                    rer_formula_text = `RER = 30 * ${bw_kg} + 70 = ${rer.toFixed(1)} kcal/日`;
                }
                
                let factor = 1.0;
                let factor_text = '';
                
                switch (purpose) {
                    case 'maintenance':
                        const neuter_status = document.getElementById('neuter_status').value;
                        const obesity_prone = document.getElementById('obesity_prone').checked;
                        if (species === 'dog') {
                            if (obesity_prone) { factor = 1.4; factor_text = '肥満傾向/低活動'; }
                            else if (neuter_status === 'neutered') { factor = 1.6; factor_text = '去勢済'; }
                            else { factor = 1.8; factor_text = '未去勢'; }
                        } else { // cat
                            if (obesity_prone) { factor = 1.0; factor_text = '肥満傾向/低活動'; }
                            else if (neuter_status === 'neutered') { factor = 1.2; factor_text = '去勢済'; }
                            else { factor = 1.4; factor_text = '未去勢'; }
                        }
                        break;
                    case 'growth':
                        const age_stage = document.getElementById('age_stage').value;
                        if (species === 'dog') {
                            if (age_stage === 'puppy_young') { factor = 3.0; factor_text = '成長期 (<4ヶ月)'; }
                            else { factor = 2.0; factor_text = '成長期 (>=4ヶ月)'; }
                        } else { // cat
                            factor = 2.5; factor_text = '成長期 (子猫)';
                        }
                        break;
                    case 'weight_loss':
                        factor = (species === 'dog') ? 1.0 : 0.8;
                        factor_text = '減量';
                        break;
                    case 'critical_care':
                        factor = 1.0;
                        factor_text = '入院/クリティカル';
                        break;
                    case 'gestation':
                        factor = (species === 'dog') ? 1.8 : 2.0;
                        factor_text = '妊娠期';
                        break;
                    case 'lactation':
                        const litter_size = parseInt(document.getElementById('litter_size').value) || 0;
                        if (species === 'dog' && litter_size > 0) {
                            factor = 2.1 + (0.25 * litter_size);
                            factor_text = `授乳期 (${litter_size}頭, ピーク時簡易式)`;
                        } else {
                            factor = (species === 'dog') ? 4.0 : 3.0;
                            factor_text = '授乳期 (一般)';
                        }
                        break;
                }

                const mer = rer * factor;
                const foodAmount = !isNaN(food_density) && food_density > 0 ? (mer / food_density) * 100 : 0;
                
                resultHtml = `
                    <h4 class="font-semibold text-lg mb-2">計算結果</h4>
                    <p><strong>安静時エネルギー要求量 (RER):</strong> <span class="font-bold text-emerald-700">${rer.toFixed(1)}</span> kcal/日</p>
                    <p><strong>1日の維持エネルギー要求量 (DER/MER):</strong> <span class="font-bold text-emerald-700">${mer.toFixed(1)}</span> kcal/日</p>
                    ${foodAmount > 0 ? `<p class="text-xl font-bold mt-2 text-emerald-700"><strong>1日の給与量目安:</strong> ${foodAmount.toFixed(1)} g/日</p>` : ''}
                    <h5 class="font-semibold mt-4 mb-1">計算過程</h5>
                    <div class="calc-formula">
${rer_formula_text}
DER/MER = RER * 係数 = ${rer.toFixed(1)} * ${factor.toFixed(1)} (係数: ${factor_text}) = ${mer.toFixed(1)} kcal/日
${foodAmount > 0 ? `給与量 = DER / (フードkcal/100g) * 100 = ${mer.toFixed(1)} / ${food_density} * 100 = ${foodAmount.toFixed(1)} g/日` : ''}
                    </div>
                    <p class="text-xs text-gray-600 mt-4">注意: この計算値はあくまで開始点です。個体差が大きいため、2～4週間ごとに体重とボディコンディションスコアを評価し、給与量を調整してください。</p>
                `;
                break;
            
            case 'bsa':
                const bsa_weight = parseFloat(document.getElementById('bsa-weight').value);
                const bsa_species = document.getElementById('bsa-species').value
                if (isNaN(bsa_weight) || bsa_weight <= 0) throw new Error();
                const k = bsa_species === 'dog' ? 10.1 : 10.0;
                const bsa = k * Math.pow(bsa_weight * 1000, 2/3) / 10000;
                resultHtml = `
                    <h4 class="font-semibold text-lg mb-2">計算結果</h4>
                    <p class="text-xl font-bold mt-2 text-emerald-700"><strong>体表面積 (BSA):</strong> ${bsa.toFixed(4)} m²</p>
                    <h5 class="font-semibold mt-4 mb-1">計算過程</h5>
                    <div class="calc-formula">
BSA (m²) = (K * (体重(g) ^ (2/3))) / 10000
  = (${k} * ((${bsa_weight}*1000) ^ (2/3))) / 10000 = ${bsa.toFixed(4)}
                    </div>
                    <div class="mt-6">
                        <h4 class="font-semibold text-lg mb-2">BSA早見表</h4>
                        <div class="table-container">
                            <table class="custom-table text-sm">
                                <thead><tr><th>体重(kg)</th><th>BSA(m²)</th><th>体重(kg)</th><th>BSA(m²)</th><th>体重(kg)</th><th>BSA(m²)</th></tr></thead>
                                <tbody id="bsa-table-body"></tbody>
                            </table>
                        </div>
                    </div>
                    `;
                break;

            case 'transfusion':
                const tf_species = document.getElementById('tf-species').value;
                const tf_bw = parseFloat(document.getElementById('tf-weight').value);
                const tf_bv = parseFloat(document.getElementById('tf-blood-volume').value);
                const pcv_now = parseFloat(document.getElementById('tf-patient-pcv').value);
                const pcv_target = parseFloat(document.getElementById('tf-target-pcv').value);
                const pcv_donor = parseFloat(document.getElementById('tf-donor-pcv').value);
                
                if ([tf_bw, tf_bv, pcv_now, pcv_target, pcv_donor].some(isNaN) || tf_bw <= 0 || pcv_donor <= 0) throw new Error();

                const requiredBlood = (tf_bw * tf_bv * (pcv_target - pcv_now)) / pcv_donor;
                const pcv_rise = pcv_target - pcv_now;
                const rule_of_thumb_blood = 2 * tf_bw * pcv_rise;
                const max_draw_rate = tf_species === 'dog' ? 15 : 10;
                const max_draw_vol = max_draw_rate * tf_bw;

                resultHtml = `
                    <h4 class="font-semibold text-lg mb-2">計算結果</h4>
                    <p class="text-xl font-bold mt-2 text-emerald-700"><strong>必要血液量:</strong> ${requiredBlood.toFixed(1)} mL</p>
                    <h5 class="font-semibold mt-4 mb-1">計算過程</h5>
                    <div class="calc-formula">
必要量(mL) = (体重 * 循環血液量 * (目標PCV - 現在PCV)) / ドナーPCV
  = (${tf_bw} * ${tf_bv} * (${pcv_target} - ${pcv_now})) / ${pcv_donor} = ${requiredBlood.toFixed(1)} mL
                    </div>
                    <div class="mt-6">
                        <h4 class="font-semibold text-lg mb-2">参考情報</h4>
                        <ul class="list-disc pl-5 text-sm space-y-2">
                            <li><strong>経験則による概算 (Rule of Thumb):</strong><br>
                                PCVを${pcv_rise}%上げるのに必要な全血量はおよそ <strong>${rule_of_thumb_blood.toFixed(0)} mL</strong> です。<br>
                                <span class="text-xs text-gray-500">(計算式: 2 mL/kg * ${tf_bw} kg * ${pcv_rise}%上昇)</span>
                            </li>
                            <li><strong>ドナーの安全な採血量 (目安):</strong><br>
                                体重${tf_bw} kgのドナーからの1回あたりの安全な採血量上限は、およそ <strong>${max_draw_vol.toFixed(0)} mL</strong> です。<br>
                                <span class="text-xs text-gray-500">(計算式: ${max_draw_rate} mL/kg * ${tf_bw} kg) ※ドナーの健康状態・体重を正確に評価してください。</span>
                            </li>
                        </ul>
                    </div>
                    <p class="text-xs text-gray-600 mt-4">注意: 計算値は理論値です。過輸血を避けるため、患者の状態（特に心疾患や腎疾患の有無）を考慮し、まずは計算量の25-50%を投与して反応を見ることが推奨されます。</p>
                    `;
                break;
            case 'cri_gamma':
                const cri_g_conc = parseFloat(document.getElementById('cri-g-conc').value);
                const cri_g_weight = parseFloat(document.getElementById('cri-g-weight').value);
                const cri_g_rate = parseFloat(document.getElementById('cri-g-rate').value);
                const cri_g_total_vol = parseFloat(document.getElementById('cri-g-total-vol').value);
                const cri_g_dose = parseFloat(document.getElementById('cri-g-dose').value);

                if ([cri_g_conc, cri_g_weight, cri_g_rate, cri_g_total_vol, cri_g_dose].some(isNaN) || cri_g_rate <= 0 || cri_g_conc <= 0) throw new Error();
                
                const drugAmountMl = (cri_g_dose * cri_g_weight * cri_g_total_vol * 60) / (cri_g_conc * 1000 * cri_g_rate);

                resultHtml = `
                    <h4 class="font-semibold text-lg mb-2">計算結果</h4>
                    <p>輸液${cri_g_total_vol}mLに薬剤を <strong class="text-xl text-emerald-700">${drugAmountMl.toFixed(2)} mL</strong> 添加し、<br><strong>${cri_g_rate} mL/hr</strong> の流量で投与します。</p>
                    <h5 class="font-semibold mt-4 mb-1">計算過程</h5>
                    <div class="calc-formula">
薬剤量(mL) = (投与量(μg/kg/min) * 体重(kg) * 全体量(mL) * 60) / (薬剤濃度(mg/mL) * 1000 * 点滴流量(mL/hr))
  = (${cri_g_dose} * ${cri_g_weight} * ${cri_g_total_vol} * 60) / (${cri_g_conc} * 1000 * ${cri_g_rate}) = ${drugAmountMl.toFixed(2)}
                    </div>`;
                break;
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
                break;
            case 'medication_exotic_water':
                const activeTab = document.querySelector('#water-med-tabs a.border-emerald-500').dataset.tab;
                if (activeTab === 'from_dose') {
                    const wm_fd_weight_kg = parseFloat(document.getElementById('wm-fd-weight').value) / 1000;
                    const wm_fd_dose = parseFloat(document.getElementById('wm-fd-dose').value);
                    const wm_fd_intake_L = parseFloat(document.getElementById('wm-fd-intake').value) / 1000;
                    const wm_fd_strength = parseFloat(document.getElementById('wm-fd-strength').value);
                    const wm_fd_volume_L = parseFloat(document.getElementById('wm-fd-volume').value) / 1000;
                    const wm_fd_days = parseInt(document.getElementById('wm-fd-days').value);
                    
                    if ([wm_fd_weight_kg, wm_fd_dose, wm_fd_intake_L, wm_fd_strength, wm_fd_volume_L, wm_fd_days].some(isNaN) || wm_fd_weight_kg <= 0 || wm_fd_intake_L <= 0 || wm_fd_strength <= 0 || wm_fd_volume_L <= 0 || wm_fd_days <= 0) throw new Error();

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

                    if ([wm_fc_conc, wm_fc_strength, wm_fc_volume_L, wm_fc_days].some(isNaN) || wm_fc_conc <= 0 || wm_fc_strength <= 0 || wm_fc_volume_L <= 0 || wm_fc_days <= 0) throw new Error();
                    
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
                break;
        }
        resultBox.innerHTML = resultHtml;
        resultBox.classList.remove('hidden');

        if (id === 'bsa') {
            generateBsaTable(document.getElementById('bsa-species').value);
        }

    } catch (e) {
        resultBox.classList.add('hidden');
    }
}


/**
 * BSA（体表面積）の早見表を生成します。
 * @param {string} species - 動物種 ('dog' or 'cat')
 */
function generateBsaTable(species) {
    const tableBody = document.getElementById('bsa-table-body');
    if (!tableBody) return;
    const k = species === 'dog' ? 10.1 : 10.0;
    const weights = [1,2,3,4,5,6,7,8,9,10,12,14,16,18,20,25,30,35,40,45,50,55,60];
    let tableHtml = '';
    for(let i = 0; i < weights.length; i += 3) {
        tableHtml += '<tr>';
        for(let j = 0; j < 3; j++) {
            const weight = weights[i+j];
            if(weight) {
                const bsa = k * Math.pow(weight * 1000, 2/3) / 10000;
                tableHtml += `<td><strong>${weight}kg</strong></td><td>${bsa.toFixed(3)} m²</td>`;
            } else {
                tableHtml += '<td></td><td></td>';
            }
        }
        tableHtml += '</tr>';
    }
    tableBody.innerHTML = tableHtml;
}
