// calculators-diagnostic.js

function renderDiagnosticCalculators(id) {
    switch (id) {
        case 'ferret_insulinoma':
            return `
                <p class="text-sm text-gray-600">低血糖症状を示すフェレットのインスリノーマを疑う際の補助的な診断ツールです。確定診断は病理組織検査で行う必要があります。</p>
                <div class="border-b border-gray-200 mb-4 pb-2">
                    <h3 class="text-xl font-semibold text-gray-800">1. 低血糖の確認</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div><label for="ferret_glu" class="block text-sm font-medium text-gray-700">血糖値 (mg/dL)</label><input id="ferret_glu" type="number" step="1" class="mt-1 calc-input" placeholder="例: 50"></div>
                     <div>
                        <label class="block text-sm font-medium text-gray-700">測定方法</label>
                        <p class="text-sm text-gray-800 mt-2">検査室法(ヘキソキナーゼ法)を推奨</p>
                        <p class="text-xs text-gray-500">(人用グルコメータは過小評価のリスクあり - Di Girolamo N, 2016)</p>
                     </div>
                </div>

                <div class="border-b border-gray-200 mt-6 mb-4 pb-2">
                    <h3 class="text-xl font-semibold text-gray-800">2. インスリン濃度の評価</h3>
                </div>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="ferret_ins" class="block text-sm font-medium text-gray-700">インスリン濃度</label>
                        <div class="flex items-center space-x-2 mt-1">
                            <input id="ferret_ins" type="number" step="0.1" class="calc-input" placeholder="例: 25">
                            <select id="ferret_ins_unit" class="calc-input w-auto">
                                <option value="uU/mL">μU/mL</option>
                                <option value="ng/mL">ng/mL</option>
                            </select>
                        </div>
                         <p class="text-xs text-gray-500 mt-1">ng/mLは26を掛けてμU/mLに換算されます</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">基準値 (参考)</label>
                        <p class="text-sm text-gray-800 mt-2">約 5–35 μU/mL</p>
                        <p class="text-xs text-gray-500">(Merck Vet Manual, Johnson D, 2011)</p>
                    </div>
                </div>
                 <p class="text-xs text-gray-500 mt-2"><strong>重要:</strong> 血糖値とインスリンは同時採血した検体で評価してください。</p>
                
                <div class="border-b border-gray-200 mt-6 mb-4 pb-2">
                    <h3 class="text-xl font-semibold text-gray-800">3. AIGR (修正インスリン/グルコース比) - 補助的指標</h3>
                </div>
                 <p class="text-sm text-red-600 bg-red-50 p-3 rounded-md"><strong>注意:</strong> AIGRはフェレットでの有用性が確立されておらず、偽陽性も報告されています。診断は低血糖と、その状況下で不適切に正常～高値を示すインスリン値を主軸に判断してください (Johnson D, 2011)。</p>
            `;
        default:
            return '';
    }
}

function calculateDiagnostic(id, resultBox) {
    let resultHtml = '';
    switch (id) {
        case 'ferret_insulinoma':
            const glu = parseFloat(document.getElementById('ferret_glu').value);
            const ins_raw = parseFloat(document.getElementById('ferret_ins').value);
            const ins_unit = document.getElementById('ferret_ins_unit').value;

            let ins = ins_raw;
            let conversionNote = '';
            if(ins_unit === 'ng/mL' && !isNaN(ins_raw)) {
                ins = ins_raw * 26;
                conversionNote = `<p class="text-xs text-gray-500">換算: ${ins_raw} ng/mL × 26 = ${rnd(ins, 1)} μU/mL</p>`;
            }
            
            let interpretationHtml = '';
            
            // 1. 血糖値の評価
            if (!isNaN(glu)) {
                interpretationHtml += `<h4 class="font-semibold text-lg mb-2">1. 血糖値の評価</h4>`;
                if (glu < 60) {
                    interpretationHtml += `<p class="text-red-600 font-bold">✔ 60 mg/dL未満: 低血糖が強く示唆されます。</p>`;
                } else if (glu < 70) {
                    interpretationHtml += `<p class="text-yellow-700 font-bold">✔ 70 mg/dL未満: 低血糖と判断されます。</p>`;
                } else {
                    interpretationHtml += `<p>血糖値は正常範囲内です。</p>`;
                }
                interpretationHtml += `<p class="text-xs text-gray-500">基準: < 60-70 mg/dLで低血糖と判断 (Di Girolamo N, 2016)</p>`;
            }

            // 2. インスリン濃度の評価
            if (!isNaN(glu) && !isNaN(ins)) {
                interpretationHtml += `<h4 class="font-semibold text-lg mt-4 mb-2">2. インスリン濃度の評価 (低血糖との関連)</h4>`;
                if (conversionNote) {
                    interpretationHtml += conversionNote;
                }
                 if (glu < 70 && (ins >= 5 && ins <= 35)) {
                    interpretationHtml += `<p class="text-red-600 font-bold">✔ 不適切に正常: 低血糖にも関わらずインスリン分泌が抑制されていません。インスリノーマを強く支持します。</p>`;
                } else if (glu < 70 && ins > 35) {
                     interpretationHtml += `<p class="text-red-600 font-bold">✔ 不適切に高値: 低血糖と高インスリン血症が同時に存在し、インスリノーマを極めて強く支持します。</p>`;
                } else {
                     interpretationHtml += `<p>現時点ではインスリンの不適切な分泌は明確ではありません。</p>`;
                }
                 interpretationHtml += `<p class="text-xs text-gray-500">基準: 低血糖時にインスリンが正常～高値(約5-35 μU/mL)の場合に強く支持 (Merck Vet Manual, Johnson D, 2011)</p>`;
            }

            // 3. AIGR
            if (!isNaN(glu) && !isNaN(ins)) {
                interpretationHtml += `<h4 class="font-semibold text-lg mt-4 mb-2">3. AIGR (補助指標)</h4>`;
                if (glu > 30) {
                    const aigr_us = (ins * 100) / (glu - 30);
                    interpretationHtml += `
                        <p><strong>AIGR (米国単位):</strong> <span class="font-bold text-emerald-700">${rnd(aigr_us, 1)}</span></p>
                        <div class="calc-formula text-sm">
[${rnd(ins,1)} (μU/mL) × 100] / [${glu} (mg/dL) − 30] = ${rnd(aigr_us, 1)}
                        </div>
                        <p class="text-xs text-gray-500 mt-1">犬では > 30 でインスリノーマ支持とされますが、フェレットでの基準は不明確です (Thompson JC et al.)</p>
                    `;
                } else {
                    interpretationHtml += `<p class="text-yellow-700">血糖値が30mg/dL以下の場合、AIGRは計算できません。</p>`;
                }
            }

            resultHtml = interpretationHtml;
            resultBox.innerHTML = resultHtml;
            return true;
    }
    return false;
}
