// calculator-main.js

function renderCalculator(title, id) {
    const detailContent = document.getElementById('detail-content');
    if (!detailContent) return;

    let html = `<h2 class="text-3xl font-bold text-gray-800 mb-6">${title}</h2>`;
    html += `<div id="calc-${id}" class="space-y-4">`;

    // 各カテゴリのレンダリング関数を呼び出す
    if (typeof renderNutritionCalculators === 'function') {
        html += renderNutritionCalculators(id);
    }
    if (typeof renderInfusionCalculators === 'function') {
        html += renderInfusionCalculators(id);
    }
    if (typeof renderPharmacyCalculators === 'function') {
        html += renderPharmacyCalculators(id);
    }
    if (typeof renderDiagnosticCalculators === 'function') {
        html += renderDiagnosticCalculators(id);
    }
    if (typeof renderExoticCalculators === 'function') {
        html += renderExoticCalculators(id);
    }

    html += `</div><div id="calc-result-${id}" class="calc-result-box hidden mt-6"></div>`;
    detailContent.innerHTML = html;
    
    // イベントリスナーを設定
    attachCalculatorEventListeners(id);
}

function attachCalculatorEventListeners(id) {
    const calcContainer = document.getElementById(`calc-${id}`);
    if (calcContainer) {
        calcContainer.addEventListener('input', () => calculate(id));
        
        // UIが動的に変わる計算機のための特別なリスナー
        if (id === 'calorie_dogcat_detailed') {
            document.getElementById('purpose').addEventListener('change', () => calculate(id));
            document.getElementById('species').addEventListener('change', () => calculate(id));
        }
        if (id === 'transfusion') {
            document.getElementById('tf-species').addEventListener('change', () => calculate(id));
        }
        if (id === 'medication_exotic_water') {
            document.getElementById('water-med-tabs').addEventListener('click', (e) => {
                e.preventDefault();
                const tab = e.target.closest('a');
                if (!tab) return;
                document.querySelectorAll('#water-med-tabs a').forEach(t => t.classList.remove('border-emerald-500', 'text-emerald-600'));
                tab.classList.add('border-emerald-500', 'text-emerald-600');
                document.getElementById('tab-content-from_dose').classList.toggle('hidden', tab.dataset.tab !== 'from_dose');
                document.getElementById('tab-content-from_conc').classList.toggle('hidden', tab.dataset.tab !== 'from_conc');
                calculate(id);
            });
        }
        if (id === 'oxygen') {
            document.getElementById('o2_method').addEventListener('change', () => calculate(id));
        }
        if (id === 'osmolarity') {
            document.getElementById('add_rows').addEventListener('change', () => buildOsmolarityRows());
            buildOsmolarityRows(); 
             document.getElementById('base_sol').addEventListener('change', () => calculate(id));
        }

        calculate(id); // 初回計算
    }
}

// 汎用ヘルパー関数
const rnd = (x, p = 2) => {
    if (isNaN(x) || !isFinite(x)) return '---';
    const f = Math.pow(10, p);
    return Math.round(x * f) / f;
};

// 呼び出し元の統合関数
function calculate(id) {
    const resultBox = document.getElementById(`calc-result-${id}`);
    if (!resultBox) return;

    try {
        let calculated = false;
        if (typeof calculateNutrition === 'function' && (calculated = calculateNutrition(id, resultBox))) {}
        else if (typeof calculateInfusion === 'function' && (calculated = calculateInfusion(id, resultBox))) {}
        else if (typeof calculatePharmacy === 'function' && (calculated = calculatePharmacy(id, resultBox))) {}
        else if (typeof calculateDiagnostic === 'function' && (calculated = calculateDiagnostic(id, resultBox))) {}
        else if (typeof calculateExotic === 'function' && (calculated = calculateExotic(id, resultBox))) {}
        
        if (resultBox.innerHTML.trim() !== '') {
            resultBox.classList.remove('hidden');
        } else {
            resultBox.classList.add('hidden');
        }
    } catch (e) {
        resultBox.innerHTML = '';
        resultBox.classList.add('hidden');
    }
}
