// calculators-pharmacy.js

function renderPharmacyCalculators(id) {
    switch (id) {
        case 'dilution':
            return `
                <p class="text-sm text-gray-600">C1V1 = C2V2 の公式に基づき、原液から目標濃度の溶液を作成するために必要な量を計算します。4つのうち1つの項目を空欄にしてください。</p>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label for="c1" class="block text-sm font-medium text-gray-700">原液の濃度</label>
                        <input id="c1" type="number" step="0.0001" class="mt-1 calc-input" placeholder="例: 50">
                    </div>
                    <div><label for="v1" class="block text-sm font-medium text-gray-700">原液の量 (mL)</label>
                        <input id="v1" type="number" step="0.01" class="mt-1 calc-input" placeholder="例: 2">
                    </div>
                    <div><label for="c2" class="block text-sm font-medium text-gray-700">目標の濃度</label>
                        <input id="c2" type="number" step="0.0001" class="mt-1 calc-input" placeholder="例: 5">
                    </div>
                     <div><label for="v2" class="block text-sm font-medium text-gray-700">最終的な量 (mL)</label>
                        <input id="v2" type="number" step="0.01" class="mt-1 calc-input" placeholder="例: 20">
                    </div>
                </div>
            `;
        case 'bsa':
            return `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label for="bsa-species" class="block text-sm font-medium text-gray-700">動物種</label><select id="bsa-species" class="mt-1 calc-input"><option value="dog">犬</option><option value="cat">猫</option></select></div>
                    <div><label for="bsa-weight" class="block text-sm font-medium text-gray-700">体重 (kg)</label><input type="number" id="bsa-weight" class="mt-1 calc-input" placeholder="例: 10"></div>
                </div>`;
        case 'oxygen':
            return `
                <p class="text-sm text-gray-600">酸素投与の方法に応じて、推奨される酸素流量の目安を計算します。</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label for="o2_method" class="block text-sm font-medium text-gray-700">投与方法</label>
                        <select id="o2_method" class="mt-1 calc-input">
                            <option value="nasal">鼻カテーテル/カニュラ (50-100 mL/kg/min)</option>
                            <option value="mask">マスク (100-200 mL/kg/min)</option>
                            <option value="hood">フード/ボックス/ケージ (2-5 L/min)</option>
                            <option value="hfno">高流量鼻カニュラ (HFNO, 0.5-2 L/kg/min)</option>
                        </select>
                    </div>
                    <div><label for="bw_o2" class="block text-sm font-medium text-gray-700">体重 (kg)</label>
                        <input id="bw_o2" type="number" step="0.01" placeholder="例: 5" class="mt-1 calc-input">
                    </div>
                    <div><label for="o2_coef" class="block text-sm font-medium text-gray-700">推奨流量係数</label>
                        <input id="o2_coef" type="number" step="1" placeholder="自動入力" class="mt-1 calc-input">
                    </div>
                    <div><label for="o2_cage_vol" class="block text-sm font-medium text-gray-700">ケージ体積 (L)</label>
                        <input id="o2_cage_vol" type="number" step="1" placeholder="ケージ使用時" class="mt-1 calc-input">
                    </div>
                </div>
            `;
        case 'plasma_osmolarity':
            return `
                <p class="text-sm text-gray-600">血漿浸透圧の推定値を計算します。犬の基準値は約 290-310 mOsm/kg、猫は約 300-330 mOsm/kg です。</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label for="osm_na" class="block text-sm font-medium text-gray-700">Na (mEq/L)</label><input id="osm_na" type="number" step="0.1" class="mt-1 calc-input" placeholder="例: 145"></div>
                    <div><label for="osm_k" class="block text-sm font-medium text-gray-700">K (mEq/L)</label><input id="osm_k" type="number" step="0.1" class="mt-1 calc-input" placeholder="例: 4.0"></div>
                    <div><label for="osm_bun" class="block text-sm font-medium text-gray-700">BUN (mg/dL)</label><input id="osm_bun" type="number" step="1" class="mt-1 calc-input" placeholder="例: 20"></div>
                    <div><label for="osm_glu" class="block text-sm font-medium text-gray-700">Glucose (mg/dL)</label><input id="osm_glu" type="number" step="1" class="mt-1 calc-input" placeholder="例: 100"></div>
                </div>
                <p class="text-xs text-gray-500 mt-2">計算式: 2 * (Na + K) + (BUN / 2.8) + (Glucose / 18)</p>
            `;
        default:
            return '';
    }
}

function calculatePharmacy(id, resultBox) {
    let resultHtml = '';
    switch (id) {
        case 'dilution':
            const c1 = parseFloat(document.getElementById('c1').value);
            const v1 = parseFloat(document.getElementById('v1').value);
            const c2 = parseFloat(document.getElementById('c2').value);
            const v2 = parseFloat(document.getElementById('v2').value);
            
            const inputs = [!isNaN(c1), !isNaN(v1), !isNaN(c2), !isNaN(v2)];
            const emptyCount = inputs.filter(i => !i).length;

            if (emptyCount !== 1) {
               resultHtml = `<p class="text-red-600">4つの項目のうち、1つだけを空欄にして計算してください。</p>`;
            } else if (isNaN(v1)) { // V1を計算
               const needV1 = (c2 * v2) / c1;
               resultHtml = `<p><strong>必要な原液量 (V1):</strong> <span class="text-xl font-bold text-emerald-700">${rnd(needV1, 3)} mL</span></p>
                           <p><strong>加える希釈液の量:</strong> ${rnd(v2 - needV1, 3)} mL</p>`;
            } else if (isNaN(v2)) { // V2を計算
               const needV2 = (c1 * v1) / c2;
               resultHtml = `<p><strong>最終的な溶液量 (V2):</strong> <span class="text-xl font-bold text-emerald-700">${rnd(needV2, 3)} mL</span></p>
                           <p><strong>加える希釈液の量:</strong> ${rnd(needV2 - v1, 3)} mL</p>`;
            } else if (isNaN(c1)) { // C1を計算
               const needC1 = (c2 * v2) / v1;
               resultHtml = `<p><strong>必要な原液濃度 (C1):</strong> <span class="text-xl font-bold text-emerald-700">${rnd(needC1, 3)}</span></p>`;
            } else if (isNaN(c2)) { // C2を計算
               const needC2 = (c1 * v1) / v2;
               resultHtml = `<p><strong>最終的な濃度 (C2):</strong> <span class="text-xl font-bold text-emerald-700">${rnd(needC2, 3)}</span></p>`;
            }
            resultBox.innerHTML = resultHtml;
            return true;
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
            resultBox.innerHTML = resultHtml;
            generateBsaTable(bsa_species);
            return true;
        case 'oxygen':
            const o2_method = document.getElementById('o2_method').value;
            const o2_bw = parseFloat(document.getElementById('bw_o2').value);
            const o2_coef = parseFloat(document.getElementById('o2_coef').value);
            const o2_cage_vol = parseFloat(document.getElementById('o2_cage_vol').value);
            if (isNaN(o2_coef)) throw new Error();

            let flowText = '';
            if (['nasal', 'mask'].includes(o2_method)) {
                if (isNaN(o2_bw) || o2_bw <= 0) throw new Error();
                const mlmin = o2_bw * o2_coef;
                flowText = `<p>推奨流量: <span class="text-xl font-bold text-emerald-700">${rnd(mlmin / 1000, 2)} L/min</span> (${rnd(mlmin, 0)} mL/min)</p>`;
            } else if (o2_method === 'hfno') {
                 if (isNaN(o2_bw) || o2_bw <= 0) throw new Error();
                const lmin = o2_bw * o2_coef;
                flowText = `<p>推奨流量: <span class="text-xl font-bold text-emerald-700">${rnd(lmin, 2)} L/min</span></p>`;
            } else { // hood
                flowText = `<p>推奨流量: <span class="text-xl font-bold text-emerald-700">${rnd(o2_coef, 1)} L/min</span></p>
                            <p class="text-sm text-gray-600">（飽和後は0.5-1 L/minに低減を検討）</p>`;
                if (!isNaN(o2_cage_vol) && o2_cage_vol > 0) {
                    const turnovers = o2_coef * 60 / o2_cage_vol;
                    flowText += `<p class="text-sm text-gray-500 mt-2">ケージ体積 ${o2_cage_vol}L の場合、1時間あたり約 ${rnd(turnovers,1)}回 のガス交換に相当します。</p>`;
                }
            }
            resultBox.innerHTML = flowText;
            return true;
        case 'plasma_osmolarity':
            const osm_na = parseFloat(document.getElementById('osm_na').value);
            const osm_k = parseFloat(document.getElementById('osm_k').value);
            const osm_bun = parseFloat(document.getElementById('osm_bun').value);
            const osm_glu = parseFloat(document.getElementById('osm_glu').value);
            if ([osm_na, osm_k, osm_bun, osm_glu].some(isNaN)) throw new Error();

            const osmolarity = 2 * (osm_na + osm_k) + (osm_bun / 2.8) + (osm_glu / 18);
            resultHtml = `
                <h4 class="font-semibold text-lg mb-2">計算結果</h4>
                <p><strong>計算血漿浸透圧:</strong> <span class="font-bold text-emerald-700 text-xl">${rnd(osmolarity, 1)} mOsm/kg</span></p>
                <h5 class="font-semibold mt-4 mb-1">計算過程</h5>
                <div class="calc-formula">
2 * (${osm_na} + ${osm_k}) + (${osm_bun} / 2.8) + (${osm_glu} / 18) = ${rnd(osmolarity, 1)}
                </div>`;
            resultBox.innerHTML = resultHtml;
            return true;
    }
    return false;
}
