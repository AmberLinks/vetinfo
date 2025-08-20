// calculators-nutrition.js

function renderNutritionCalculators(id) {
    switch (id) {
        case 'calorie_dogcat_detailed':
            return `
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
        case 'weight_loss_ideal':
            return `
                <p class="text-sm text-gray-600">現在の体重とBCS(9段階評価)から理想体重を推定し、減量に必要なカロリーの開始点を計算します。</p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><label for="sp_wt" class="block text-sm font-medium text-gray-700">動物種</label>
                        <select id="sp_wt" class="mt-1 calc-input"><option value="dog">犬</option><option value="cat">猫</option></select>
                    </div>
                    <div><label for="bw_now" class="block text-sm font-medium text-gray-700">現在体重 (kg)</label><input id="bw_now" type="number" step="0.01" class="mt-1 calc-input"></div>
                    <div><label for="bcs" class="block text-sm font-medium text-gray-700">BCS (9段階)</label>
                        <select id="bcs" class="mt-1 calc-input">
                            <option value="5">5/9 (理想)</option>
                            <option value="6">6/9 (過体重 +10%)</option>
                            <option value="7">7/9 (過体重 +20%)</option>
                            <option value="8">8/9 (過体重 +30%)</option>
                            <option value="9">9/9 (過体重 +40%)</option>
                        </select>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div><label for="cal_cut" class="block text-sm font-medium text-gray-700">カロリー係数 (減量)</label>
                        <select id="cal_cut" class="mt-1 calc-input">
                            <option value="0.8">RER(理想体重)の80% (推奨)</option>
                            <option value="0.7">RER(理想体重)の70%</option>
                            <option value="0.6">RER(理想体重)の60% (厳格)</option>
                        </select>
                    </div>
                     <div><label for="rate_w" class="block text-sm font-medium text-gray-700">目標減量速度</label>
                        <select id="rate_w" class="mt-1 calc-input">
                            <option value="dog">犬: 1-2%/週</option>
                            <option value="cat">猫: 0.5-2%/週</option>
                        </select>
                    </div>
                </div>
            `;
        default:
            return '';
    }
}

function calculateNutrition(id, resultBox) {
    let resultHtml = '';
    switch (id) {
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
            resultBox.innerHTML = resultHtml;
            return true;
        case 'weight_loss_ideal':
            const sp_wt = document.getElementById('sp_wt').value;
            const bw_now = parseFloat(document.getElementById('bw_now').value);
            const bcs = parseInt(document.getElementById('bcs').value);
            const cut = parseFloat(document.getElementById('cal_cut').value);
             if (isNaN(bw_now) || bw_now <= 0) throw new Error();

            const overMap = {5:0, 6:0.10, 7:0.20, 8:0.30, 9:0.40};
            const over = overMap[bcs] || 0;
            const ideal = bw_now / (1 + over);
            const RER = 70 * Math.pow(ideal, 0.75);
            const kcal = RER * cut;

            resultHtml = `<h4 class="font-semibold text-lg mb-2">計算結果</h4>
                          <div class="space-y-2">
                            <p><strong>推定理想体重:</strong> <span class="text-lg font-bold text-emerald-700">${rnd(ideal, 2)} kg</span></p>
                            <p><strong>RER (at 理想体重):</strong> ${rnd(RER, 0)} kcal/日</p>
                            <p><strong>減量用カロリー (開始目安):</strong> <span class="text-xl font-bold text-emerald-700">${rnd(kcal, 0)} kcal/日</span> (RERの${cut*100}%)</p>
                          </div>
                          <p class="text-xs text-gray-600 mt-4">注意: これはあくまで開始点です。定期的に体重とBCSを評価し、給与量を10-20%ずつ調整してください。特に猫の急激な減量は肝リピドーシスのリスクがあるため注意が必要です。</p>`;
            resultBox.innerHTML = resultHtml;
            return true;
    }
    return false;
}
