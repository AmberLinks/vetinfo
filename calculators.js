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
        
        // --- NEW CALCULATORS ---
        case 'fluids':
            html += `
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
            break;
        case 'drip':
            html += `
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
            break;
        case 'dilution':
            html += `
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
            break;
        case 'oxygen':
            html += `
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
            break;
        case 'electrolytes':
            html += `
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
            break;
        case 'osmolarity':
             html += `
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
            break;
        case 'weight_loss_ideal':
            html += `
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
            break;
    }

    html += `<div id="calc-result-${id}" class="calc-result-box hidden mt-6"></div></div>`;
    detailContent.innerHTML = html;

    // --- イベントリスナーを設定 ---
    const calcContainer = document.getElementById(`calc-${id}`);
    if (calcContainer) {
        calcContainer.addEventListener('input', () => calculate(id));
        
        // --- 標準の計算機 ---
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
        
        // --- 新しい計算機 ---
        if (id === 'oxygen') {
            const methodSelect = document.getElementById('o2_method');
            methodSelect.addEventListener('change', () => updateOxygenUI());
            updateOxygenUI();
        }
        if (id === 'osmolarity') {
            const rowsInput = document.getElementById('add_rows');
            rowsInput.addEventListener('change', () => buildOsmolarityRows());
            buildOsmolarityRows(); // 初期表示
             document.getElementById('base_sol').addEventListener('change', () => calculate(id));
        }

        // 初回計算を実行
        calculate(id);
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
 * 酸素流量計算ツールのUIを更新します。
 */
function updateOxygenUI() {
    const method = document.getElementById('o2_method').value;
    const coefInput = document.getElementById('o2_coef');
    const defaultCoefs = { nasal: 100, mask: 150, hood: 3, hfno: 1.0 };
    coefInput.value = defaultCoefs[method] || '';

    // ケージの体積入力欄の表示/非表示を切り替え
    const isCage = (method === 'hood');
    document.getElementById('o2_cage_vol').parentElement.style.display = isCage ? 'block' : 'none';
    // 体重入力が不要なケース
    const needsWeight = ['nasal', 'mask', 'hfno'].includes(method);
    document.getElementById('bw_o2').parentElement.style.display = needsWeight ? 'block' : 'none';
    
    calculate('oxygen');
}

/**
 * 浸透圧計算ツール用の薬剤入力フィールドを動的に生成します。
 */
function buildOsmolarityRows() {
    const n = parseInt(document.getElementById('add_rows').value || '0');
    const zone = document.getElementById('add_zone');
    zone.innerHTML = '';
    for (let i = 0; i < n; i++) {
        const div = document.createElement('div');
        div.className = 'grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-200 pt-4';
        div.innerHTML = `
            <div class="md:col-span-3"><label class="block text-sm font-semibold text-gray-700">薬剤 ${i + 1}</label></div>
            <div><label for="add_name_${i}" class="block text-sm font-medium text-gray-700">名称 (任意)</label><input id="add_name_${i}" type="text" class="mt-1 calc-input"></div>
            <div><label for="add_osm_${i}" class="block text-sm font-medium text-gray-700">mOsm/L</label><input id="add_osm_${i}" type="number" step="1" placeholder="例: 500" class="mt-1 calc-input"></div>
            <div><label for="add_vol_${i}" class="block text-sm font-medium text-gray-700">体積 (mL)</label><input id="add_vol_${i}" type="number" step="0.1" placeholder="例: 10" class="mt-1 calc-input"></div>
        `;
        zone.appendChild(div);
    }
     // 新しく生成された入力フィールドにもイベントリスナーを追加
    zone.querySelectorAll('input').forEach(input => input.addEventListener('input', () => calculate('osmolarity')));
    calculate('osmolarity');
}

/**
 * 指定されたIDの計算を実行し、結果を表示します。
 * @param {string} id - 計算ツールのユニークID
 */
function calculate(id) {
    const resultBox = document.getElementById(`calc-result-${id}`);
    if (!resultBox) return;
    let resultHtml = '';
    
    const rnd = (x, p = 2) => {
        if (isNaN(x) || !isFinite(x)) return '---';
        const f = Math.pow(10, p);
        return Math.round(x * f) / f;
    };
    
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
                break;
            
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
                break;
            
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
                break;
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
                break;
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
                resultHtml = flowText;
                break;
            case 'electrolytes':
                const base_na_conc = parseFloat(document.getElementById('base_na_conc').value) || 0;
                const base_k_conc = parseFloat(document.getElementById('base_k_conc').value) || 0;

                // Na
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
                    if (na_now > na_goal) { // 高Na症の場合の自由水欠乏
                        const freeWater = ((na_now/na_goal)-1)*TBW;
                        naHtml += `<p><strong>自由水欠乏量(高Na症):</strong> ${rnd(freeWater, 2)} L</p>`;
                    }
                     naHtml += `<p class="text-xs text-gray-500 pt-2 border-t mt-2">参考: 基礎輸液(${base_na_conc}mEq/L)を1L投与した場合のNa変化予測 ≈ ${rnd((base_na_conc - na_now) / (TBW + 1), 2)} mEq/L</p>
                                </div>`;
                }
                
                // K
                const k_now = parseFloat(document.getElementById('k_now').value);
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
                break;
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
                break;
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
                break;
        }
        resultBox.innerHTML = resultHtml;
        resultBox.classList.remove('hidden');

        if (id === 'bsa') {
            generateBsaTable(document.getElementById('bsa-species').value);
        }

    } catch (e) {
        // Hide result box on error (e.g., incomplete input)
        if (resultBox) {
            resultBox.innerHTML = '';
            resultBox.classList.add('hidden');
        }
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
