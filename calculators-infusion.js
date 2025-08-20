// calculators-infusion.js

function renderInfusionCalculators(id) {
    switch (id) {
        case 'fluids':
            return `
                <p class="text-sm text-gray-600">維持輸液量、脱水補正量、および継続的な損失を合算して、1時間あたりの推奨輸液流量を計算します。</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label for="sp_fl" class="block text-sm font-medium text-gray-700">動物種</label>
                        <select id="sp_fl" class="mt-1 calc-input"><option value="dog">犬</option><option value="cat">猫</option></select>
                    </div>
                    <div><label for="bw_fl" class="block text-sm font-medium text-gray-700">体重 (kg)</label>
                        <input id="bw_fl" type="number" min="0" step="0.01" placeholder="例: 5.2" class="mt-1 calc-input">
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div><label for="m_dog" class="block text-sm font-medium text-gray-700">維持式（犬）</label>
                        <select id="m_dog" class="mt-1 calc-input">
                            <option value="60">60 mL/kg/日</option>
                            <option value="met">132 × BW^0.75 mL/日</option>
                            <option value="lin">30 × BW + 70 mL/日</option>
                        </select>
                    </div>
                    <div><label for="m_cat" class="block text-sm font-medium text-gray-700">維持式（猫）</label>
                        <select id="m_cat" class="mt-1 calc-input">
                            <option value="40">40 mL/kg/日</option>
                            <option value="met">80 × BW^0.75 mL/日</option>
                            <option value="lin">30 × BW + 70 mL/日</option>
                        </select>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><label for="dehyd" class="block text-sm font-medium text-gray-700">脱水率 (%)</label>
                        <input id="dehyd" type="number" min="0" max="15" step="0.1" placeholder="例: 8" class="mt-1 calc-input">
                    </div>
                    <div><label for="rehyd_hours" class="block text-sm font-medium text-gray-700">補正時間 (h)</label>
                        <input id="rehyd_hours" type="number" min="1" max="48" step="1" value="24" class="mt-1 calc-input">
                    </div>
                    <div><label for="ongoing" class="block text-sm font-medium text-gray-700">継続損失 (mL/h)</label>
                        <input id="ongoing" type="number" min="0" step="1" value="0" class="mt-1 calc-input">
                    </div>
                </div>
                <p class="text-xs text-gray-500">計算根拠: AAHA 2024 Fluid Therapy Guidelines</p>
            `;
        case 'transfusion':
            return `
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
        case 'drip':
            return `
                <p class="text-sm text-gray-600">輸液ポンプの流量(mL/h)と、自然滴下での滴下数(滴/分)を相互に換算します。</p>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label for="mode_drip" class="block text-sm font-medium text-gray-700">換算モード</label>
                        <select id="mode_drip" class="mt-1 calc-input">
                            <option value="ml2gtt">mL/h → 滴/分</option>
                            <option value="gtt2ml">滴/分 → mL/h</option>
                        </select>
                    </div>
                    <div><label for="df" class="block text-sm font-medium text-gray-700">滴下係数 (gtt/mL)</label>
                        <input id="df" type="number" step="1" min="5" value="20" class="mt-1 calc-input">
                    </div>
                    <div><label for="mlh" class="block text-sm font-medium text-gray-700">輸液流量 (mL/h)</label>
                        <input id="mlh" type="number" step="0.1" placeholder="例: 50" class="mt-1 calc-input">
                    </div>
                    <div><label for="gttm" class="block text-sm font-medium text-gray-700">滴下数 (滴/分)</label>
                        <input id="gttm" type="number" step="0.1" placeholder="例: 17" class="mt-1 calc-input">
                    </div>
                </div>
                 <p class="text-xs text-gray-500">計算式: 滴/分 = (mL/h × gtt/mL) ÷ 60</p>
            `;
        case 'cri_gamma':
            return `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label for="cri-g-conc" class="block text-sm font-medium text-gray-700">薬剤濃度 (mg/mL)</label><input type="number" id="cri-g-conc" class="mt-1 calc-input" placeholder="例: 20"></div>
                    <div><label for="cri-g-weight" class="block text-sm font-medium text-gray-700">体重 (kg)</label><input type="number" id="cri-g-weight" class="mt-1 calc-input" placeholder="例: 5"></div>
                    <div><label for="cri-g-rate" class="block text-sm font-medium text-gray-700">点滴流量 (mL/hr)</label><input type="number" id="cri-g-rate" class="mt-1 calc-input" placeholder="例: 10"></div>
                    <div><label for="cri-g-total-vol" class="block text-sm font-medium text-gray-700">輸液全体量 (mL)</label><input type="number" id="cri-g-total-vol" class="mt-1 calc-input" placeholder="例: 250"></div>
                    <div><label for="cri-g-dose" class="block text-sm font-medium text-gray-700">投与量 (μg/kg/min)</label><input type="number" id="cri-g-dose" class="mt-1 calc-input" placeholder="例: 5"></div>
                </div>`;
        case 'electrolytes':
            return `
                <div class="border-b border-gray-200 mb-4 pb-2">
                    <h3 class="text-xl font-semibold text-gray-800">基礎輸液情報</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label for="base_na_conc" class="block text-sm font-medium text-gray-700">基礎輸液のNa濃度 (mEq/L)</label><input id="base_na_conc" type="number" step="1" placeholder="例: 130 (乳酸リンゲル)" class="mt-1 calc-input"></div>
                    <div><label for="base_k_conc" class="block text-sm font-medium text-gray-700">基礎輸液のK濃度 (mEq/L)</label><input id="base_k_conc" type="number" step="1" placeholder="例: 4 (乳酸リンゲル)" class="mt-1 calc-input"></div>
                </div>

                <div class="border-b border-gray-200 mt-6 mb-4 pb-2">
                    <h3 class="text-xl font-semibold text-gray-800">A. ナトリウム補正</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><label for="na_now" class="block text-sm font-medium text-gray-700">現在Na (mEq/L)</label><input id="na_now" type="number" step="0.1" class="mt-1 calc-input"></div>
                    <div><label for="na_goal" class="block text-sm font-medium text-gray-700">目標Na (mEq/L)</label><input id="na_goal" type="number" step="0.1" class="mt-1 calc-input"></div>
                    <div><label for="bw_na" class="block text-sm font-medium text-gray-700">体重(kg)</label><input id="bw_na" type="number" step="0.01" class="mt-1 calc-input"></div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div><label for="tbw_frac" class="block text-sm font-medium text-gray-700">総体水分(TBW)係数</label><input id="tbw_frac" type="number" step="0.05" value="0.6" class="mt-1 calc-input"></div>
                    <div><label for="na_maxday" class="block text-sm font-medium text-gray-700">1日の安全な補正上限 (mEq/L)</label><input id="na_maxday" type="number" step="1" value="12" class="mt-1 calc-input"></div>
                </div>

                <div class="border-b border-gray-200 mt-8 mb-4 pb-2">
                    <h3 class="text-xl font-semibold text-gray-800">B. カリウム補正</h3>
                </div>
                 <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><label for="k_now" class="block text-sm font-medium text-gray-700">現在K (mEq/L)</label><input id="k_now" type="number" step="0.1" class="mt-1 calc-input"></div>
                    <div><label for="bag_vol" class="block text-sm font-medium text-gray-700">輸液バッグ容量 (mL)</label><input id="bag_vol" type="number" step="1" placeholder="例: 500" class="mt-1 calc-input"></div>
                    <div><label for="k_target" class="block text-sm font-medium text-gray-700">目標K濃度 (mEq/L)</label><input id="k_target" type="number" step="1" placeholder="例: 40" class="mt-1 calc-input"></div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div><label for="k_stock" class="block text-sm font-medium text-gray-700">添加液(KCl)濃度 (mEq/mL)</label><input id="k_stock" type="number" step="0.01" value="2" class="mt-1 calc-input"></div>
                    <div><label for="inf_rate" class="block text-sm font-medium text-gray-700">輸液速度 (mL/h)</label><input id="inf_rate" type="number" step="0.1" placeholder="速度チェック用" class="mt-1 calc-input"></div>
                    <div><label for="bw_k" class="block text-sm font-medium text-gray-700">体重 (kg)</label><input id="bw_k" type="number" step="0.01" placeholder="速度チェック用" class="mt-1 calc-input"></div>
                </div>
                 <p class="text-xs text-gray-500 mt-4">注意: Naの過速補正はODS、Kの過剰投与は心毒性のリスクがあります。最大K投与速度 ≤0.5 mEq/kg/h を厳守してください。</p>
            `;
        case 'osmolarity':
            return `
                <p class="text-sm text-gray-600">基礎輸液に複数の薬剤を混合した際の、最終的な浸透圧を概算します。末梢投与では600 mOsm/L以上で静脈炎のリスクが高まります。</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label for="base_sol" class="block text-sm font-medium text-gray-700">基礎輸液</label>
                        <select id="base_sol" class="mt-1 calc-input">
                            <option value="custom">手入力</option>
                            <option value="308">0.9% NaCl (308 mOsm/L)</option>
                            <option value="273">乳酸リンゲル LRS (273 mOsm/L)</option>
                            <option value="294">Plasma-Lyte A (294 mOsm/L)</option>
                        </select>
                    </div>
                    <div><label for="base_osm" class="block text-sm font-medium text-gray-700">基礎輸液の浸透圧 (mOsm/L)</label><input id="base_osm" type="number" step="1" placeholder="手入力時" class="mt-1 calc-input"></div>
                    <div><label for="base_vol" class="block text-sm font-medium text-gray-700">基礎輸液の体積 (mL)</label><input id="base_vol" type="number" step="1" placeholder="例: 500" class="mt-1 calc-input"></div>
                    <div><label for="add_rows" class="block text-sm font-medium text-gray-700">追加する薬剤の数</label><input id="add_rows" type="number" step="1" value="2" min="1" max="10" class="mt-1 calc-input"></div>
                </div>
                <div id="add_zone" class="mt-4 space-y-4"></div>
            `;
        default:
            return '';
    }
}

function calculateInfusion(id, resultBox) {
    let resultHtml = '';
    switch (id) {
        case 'fluids':
            const sp = document.getElementById('sp_fl').value;
            const bw = parseFloat(document.getElementById('bw_fl').value);
            const dehyd = parseFloat(document.getElementById('dehyd').value || '0') / 100;
            const hrs = parseFloat(document.getElementById('rehyd_hours').value || '24');
            const ongoing = parseFloat(document.getElementById('ongoing').value || '0');
            if (isNaN(bw) || bw <= 0) throw new Error();

            let m;
            if (sp === 'dog') {
                const mode = document.getElementById('m_dog').value;
                if (mode === '60') m = 60 * bw;
                else if (mode === 'met') m = 132 * Math.pow(bw, 0.75);
                else m = 30 * bw + 70;
            } else {
                const mode = document.getElementById('m_cat').value;
                if (mode === '40') m = 40 * bw;
                else if (mode === 'met') m = 80 * Math.pow(bw, 0.75);
                else m = 30 * bw + 70;
            }
            const maint_mL_day = m;
            const maint_mL_h = maint_mL_day / 24;
            const deficit_mL = bw * dehyd * 1000;
            const rehyd_mL_h = deficit_mL / hrs;
            const total_mL_h = maint_mL_h + rehyd_mL_h + ongoing;
            
            resultHtml = `
                <h4 class="font-semibold text-lg mb-2">計算結果</h4>
                <p class="text-2xl font-bold text-emerald-700">${rnd(total_mL_h, 1)} mL/h</p>
                <h5 class="font-semibold mt-4 mb-1">内訳</h5>
                <div class="calc-formula">
<p><strong>維持輸液量:</strong> ${rnd(maint_mL_h, 1)} mL/h (${rnd(maint_mL_day, 0)} mL/日)</p>
<p><strong>脱水補正量:</strong> ${rnd(rehyd_mL_h, 1)} mL/h (総量: ${rnd(deficit_mL, 0)} mL を ${hrs}時間で補正)</p>
<p><strong>継続損失量:</strong> ${rnd(ongoing, 1)} mL/h</p>
<hr class="my-2 border-gray-400">
<p><strong>合計流量:</strong> ${rnd(total_mL_h, 1)} mL/h</p>
                </div>
            `;
            resultBox.innerHTML = resultHtml;
            return true;
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
            resultBox.innerHTML = resultHtml;
            return true;
        case 'drip':
            const mode_drip = document.getElementById('mode_drip').value;
            const df = parseFloat(document.getElementById('df').value);
            const mlh = parseFloat(document.getElementById('mlh').value);
            const gttm = parseFloat(document.getElementById('gttm').value);
            if (isNaN(df) || df <= 0) throw new Error();

            if (mode_drip === 'ml2gtt') {
                if (isNaN(mlh) || mlh < 0) throw new Error();
                const drops = (mlh * df) / 60;
                resultHtml = `<h4 class="font-semibold text-lg mb-2">換算結果</h4>
                            <p class="text-xl font-bold mt-2 text-emerald-700">${rnd(drops, 1)} 滴/分</p>
                            <p class="text-sm text-gray-600 mt-1">(${rnd(60 / drops, 1)} 秒に1滴)</p>`;
            } else {
                if (isNaN(gttm) || gttm < 0) throw new Error();
                const flow = (gttm * 60) / df;
                resultHtml = `<h4 class="font-semibold text-lg mb-2">換算結果</h4>
                            <p class="text-xl font-bold mt-2 text-emerald-700">${rnd(flow, 1)} mL/h</p>`;
            }
            resultBox.innerHTML = resultHtml;
            return true;
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
            resultBox.innerHTML = resultHtml;
            return true;
        case 'electrolytes':
            const base_na_conc = parseFloat(document.getElementById('base_na_conc').value) || 0;
            const base_k_conc = parseFloat(document.getElementById('base_k_conc').value) || 0;

            const na_now = parseFloat(document.getElementById('na_now').value);
            const na_goal = parseFloat(document.getElementById('na_goal').value);
            const bw_na = parseFloat(document.getElementById('bw_na').value);
            const tbw_frac = parseFloat(document.getElementById('tbw_frac').value);
            const na_maxday = parseFloat(document.getElementById('na_maxday').value);
            
            let naHtml = '<h4>A. Na補正 結果</h4>';
            if (![na_now, na_goal, bw_na, tbw_frac, na_maxday].some(isNaN)) {
                const TBW = bw_na * tbw_frac;
                const delta = na_goal - na_now;
                const deficit_mmol = delta * TBW;
                const cappedGoal = (Math.abs(delta) > na_maxday) ? na_now + Math.sign(delta) * na_maxday : na_goal;
                const cappedDef = (cappedGoal - na_now) * TBW;

                naHtml += `<div class="calc-formula space-y-2">
                            <p><strong>Na不足量(目標値まで):</strong> ${rnd(deficit_mmol, 1)} mEq</p>`;
                if (Math.abs(delta) > na_maxday) {
                    naHtml += `<p class="text-yellow-700"><strong>⚠ 1日の安全な補正量(～${na_maxday}mEq/L)を考慮した目標Na:</strong> ${rnd(cappedGoal, 1)} mEq/L</p>
                               <p><strong>1日目に補うNa量:</strong> ${rnd(cappedDef, 1)} mEq</p>`;
                }
                if (na_now > na_goal) {
                    const freeWater = ((na_now/na_goal)-1)*TBW;
                    naHtml += `<p><strong>自由水欠乏量(高Na症):</strong> ${rnd(freeWater, 2)} L</p>`;
                }
                 naHtml += `<p class="text-xs text-gray-500 pt-2 border-t mt-2">参考: 基礎輸液(${base_na_conc}mEq/L)を1L投与した場合のNa変化予測 ≈ ${rnd((base_na_conc - na_now) / (TBW + 1), 2)} mEq/L</p>
                            </div>`;
            }
            
            const bag_vol = parseFloat(document.getElementById('bag_vol').value);
            const k_target = parseFloat(document.getElementById('k_target').value);
            const k_stock = parseFloat(document.getElementById('k_stock').value);
            const inf_rate = parseFloat(document.getElementById('inf_rate').value);
            const bw_k = parseFloat(document.getElementById('bw_k').value);

            let kHtml = '<h4 class="mt-4">B. K補正 結果</h4>';
             if (![bag_vol, k_target, k_stock].some(isNaN)) {
                const bag_vol_L = bag_vol / 1000;
                const total_k_needed = k_target * bag_vol_L;
                const existing_k = base_k_conc * bag_vol_L;
                const k_to_add = total_k_needed - existing_k;

                const add_mL = k_to_add / k_stock;
                kHtml += `<div class="calc-formula space-y-2">
                            <p><strong>バッグ(${bag_vol}mL)に追加するKCl量:</strong> <strong class="text-emerald-700 text-lg">${rnd(add_mL, 2)} mL</strong> (${rnd(k_to_add, 1)} mEq)</p>
                            <p class="text-xs text-gray-500">(目標総量 ${rnd(total_k_needed,1)}mEq - 基礎輸液分 ${rnd(existing_k,1)}mEq)</p>
                            `;
                if (!isNaN(inf_rate) && !isNaN(bw_k) && inf_rate > 0 && bw_k > 0) {
                    const total_mEq_in_bag = k_target * bag_vol_L;
                    const per_h_mEq = (total_mEq_in_bag / bag_vol) * inf_rate;
                    const perkg = per_h_mEq / bw_k;

                    let speedCheckHtml = `<p><strong>K投与速度:</strong> ${rnd(perkg, 3)} mEq/kg/h</p>`;
                    if (perkg > 0.5) {
                        speedCheckHtml += `<p class="text-red-600 font-bold">⚠ 危険: 最大推奨速度(0.5mEq/kg/h)を超えています。</p>`;
                    } else {
                         speedCheckHtml += `<p class="text-green-600">✔ 安全: 最大推奨速度内です。</p>`;
                    }
                    kHtml += `<div class="pt-2 border-t mt-2">${speedCheckHtml}</div>`;
                }
                kHtml += `</div>`;
             }
            resultHtml = naHtml + kHtml;
            resultBox.innerHTML = resultHtml;
            return true;
         case 'osmolarity':
            const baseSel = document.getElementById('base_sol').value;
            let baseOsm = baseSel === 'custom' ? parseFloat(document.getElementById('base_osm').value) : parseFloat(baseSel);
            const baseVol = parseFloat(document.getElementById('base_vol').value);
            
            if (isNaN(baseOsm) || isNaN(baseVol) || baseVol <= 0) throw new Error();

            let totalmOsm = baseOsm * (baseVol / 1000);
            let totalVol = baseVol / 1000;
            let formulaHtml = `<p>基礎輸液: ${baseOsm} mOsm/L × ${rnd(baseVol / 1000, 3)} L = ${rnd(totalmOsm, 1)} mOsm</p>`;

            let i = 0;
            while (true) {
                const osmEl = document.getElementById(`add_osm_${i}`);
                const volEl = document.getElementById(`add_vol_${i}`);
                if (!osmEl || !volEl) break;

                const osm = parseFloat(osmEl.value);
                const vol = parseFloat(volEl.value);
                if (!isNaN(osm) && !isNaN(vol) && vol > 0) {
                    const name = document.getElementById(`add_name_${i}`).value || `薬剤${i + 1}`;
                    const current_mOsm = osm * (vol / 1000);
                    totalmOsm += current_mOsm;
                    totalVol += (vol / 1000);
                    formulaHtml += `<p>${name}: ${osm} mOsm/L × ${rnd(vol / 1000, 3)} L = ${rnd(current_mOsm, 1)} mOsm</p>`;
                }
                i++;
            }

            const finalOsm = totalmOsm / totalVol;
            let statusHtml = '';
            if (finalOsm >= 600) statusHtml = `<p class="font-bold text-red-600">⚠ 高浸透圧: 末梢投与は静脈障害リスク。中心静脈路を検討してください。</p>`;
            else if (finalOsm >= 500) statusHtml = `<p class="font-bold text-yellow-700">⚠ 注意: 500-600 mOsm/Lは血管径や投与部位に注意が必要です。</p>`;
            else statusHtml = `<p class="font-bold text-green-600">✔ 500 mOsm/L未満です。</p>`;

            resultHtml = `<h4 class="font-semibold text-lg mb-2">計算結果</h4>
                          <p>最終的な浸透圧 (概算): <strong class="text-xl text-emerald-700">${rnd(finalOsm, 0)} mOsm/L</strong></p>
                          ${statusHtml}
                          <h5 class="font-semibold mt-4 mb-1">計算過程</h5>
                          <div class="calc-formula">${formulaHtml}
                          <hr class="my-2 border-gray-400">
                          <p><strong>合計:</strong> ${rnd(totalmOsm, 1)} mOsm / ${rnd(totalVol, 3)} L</p>
                          </div>`;
            resultBox.innerHTML = resultHtml;
            return true;
    }
    return false;
}
