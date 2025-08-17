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
        case 'plasma_osmolarity':
            html += `
                <p class="text-sm text-gray-600">血漿浸透圧の推定値を計算します。犬の基準値は約 290-310 mOsm/kg、猫は約 300-330 mOsm/kg です。</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label for="osm_na" class="block text-sm font-medium text-gray-700">Na (mEq/L)</label><input id="osm_na" type="number" step="0.1" class="mt-1 calc-input" placeholder="例: 145"></div>
                    <div><label for="osm_k" class="block text-sm font-medium text-gray-700">K (mEq/L)</label><input id="osm_k" type="number" step="0.1" class="mt-1 calc-input" placeholder="例: 4.0"></div>
                    <div><label for="osm_bun" class="block text-sm font-medium text-gray-700">BUN (mg/dL)</label><input id="osm_bun" type="number" step="1" class="mt-1 calc-input" placeholder="例: 20"></div>
                    <div><label for="osm_glu" class="block text-sm font-medium text-gray-700">Glucose (mg/dL)</label><input id="osm_glu" type="number" step="1" class="mt-1 calc-input" placeholder="例: 100"></div>
                </div>
                <p class="text-xs text-gray-500 mt-2">計算式: 2 * (Na + K) + (BUN / 2.8) + (Glucose / 18)</p>
            `;
            break;
        case 'ferret_insulinoma':
            html += `
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
                        <div class="grid grid-cols-2 gap-2">
                            <input id="ferret_ins" type="number" step="0.1" class="mt-1 calc-input" placeholder="例: 25">
                            <select id="ferret_ins_unit" class="mt-1 calc-input">
                                <option value="uU/mL">μU/mL</option>
                                <option value="ng/mL">ng/mL (×26で換算)</option>
                            </select>
                        </div>
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
            break;
    }

    html += `<div id="calc-result-${id}" class="calc-result-box hidden mt-6"></div></div>`;
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
        
        if (id === 'oxygen') {
            const methodSelect = document.getElementById('o2_method');
            methodSelect.addEventListener('change', () => updateOxygenUI());
            updateOxygenUI();
        }
        if (id === 'osmolarity') {
            const rowsInput = document.getElementById('add_rows');
            rowsInput.addEventListener('change', () => buildOsmolarityRows());
            buildOsmolarityRows(); 
             document.getElementById('base_sol').addEventListener('change', () => calculate(id));
        }

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

    const isCage = (method === 'hood');
    document.getElementById('o2_cage_vol').parentElement.style.display = isCage ? 'block' : 'none';
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
                // ... (省略)
                break;
            case 'bsa':
                // ... (省略)
                break;
            case 'transfusion':
                // ... (省略)
                break;
            case 'cri_gamma':
                // ... (省略)
                break;
            case 'medication_exotic_oral':
                // ... (省略)
                break;
            case 'medication_exotic_water':
                // ... (省略)
                break;
            case 'fluids':
                // ... (省略)
                break;
            case 'drip':
                // ... (省略)
                break;
            case 'dilution':
                // ... (省略)
                break;
            case 'oxygen':
                // ... (省略)
                break;
            case 'electrolytes':
                // ... (省略)
                break;
             case 'osmolarity':
                // ... (省略)
                break;
            case 'weight_loss_ideal':
                // ... (省略)
                break;
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
                break;

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
                    const aigr_us = (ins * 100) / (glu - 30);
                    
                    interpretationHtml += `
                        <p><strong>AIGR (米国単位):</strong> <span class="font-bold text-emerald-700">${rnd(aigr_us, 1)}</span></p>
                        <div class="calc-formula text-sm">
[${rnd(ins,1)} (μU/mL) × 100] / [${glu} (mg/dL) − 30] = ${rnd(aigr_us, 1)}
                        </div>
                        <p class="text-xs text-gray-500 mt-1">犬では > 30 でインスリノーマ支持とされますが、フェレットでの基準は不明確です (Thompson JC et al.)</p>
                    `;
                }

                resultHtml = interpretationHtml;
                break;
        }
        // 他の計算機のロジックは長くなるため省略しています
        // 実際のコードには全ての計算ロジックが含まれます

        resultBox.innerHTML = resultHtml;
        resultBox.classList.remove('hidden');

        if (id === 'bsa') {
            generateBsaTable(document.getElementById('bsa-species').value);
        }

    } catch (e) {
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
