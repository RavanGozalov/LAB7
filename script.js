class KalmanFilter {
    constructor(F, H, Q, R, P, x) {
        this.F = F; // матриця переходу станів
        this.H = H; // матриця вимірювань
        this.Q = Q; // коваріація шуму процесу
        this.R = R; // коваріація шуму вимірювань
        this.P = P; // коваріація помилки
        this.x = x; // стан
    }

    predict() {
        this.x = this.F * this.x;
        this.P = this.F * this.P * this.F + this.Q;
        return this.x;
    }

    update(measurement) {
        const K = this.P * this.H / (this.H * this.P * this.H + this.R);
        this.x = this.x + K * (measurement - this.H * this.x);
        this.P = (1 - K * this.H) * this.P;
        return this.x;
    }
}

let chart = null;

function generateSignal(params) {
    const dt = 0.01;
    const n = Math.floor(params.time / dt);
    const t = Array.from({length: n}, (_, i) => i * dt);
    
    // Оригінальний сигнал
    const signal = t.map(time => 
        params.offset + params.amp * Math.sin(2 * Math.PI * params.freq * time)
    );
    
    // Додаємо шум
    const noiseLevel = Math.sqrt(params.noise);
    const noisy = signal.map(val => 
        val + (Math.random() - 0.5) * noiseLevel * 2
    );
    
    // Фільтр Калмана
    const kf = new KalmanFilter(
        params.F, params.H, params.Q, params.R, params.P, params.X
    );
    
    const filtered = noisy.map(measurement => {
        kf.predict();
        return kf.update(measurement);
    });

    // Розрахунок дисперсій
    const noisyVar = noisy.reduce((acc, val, i) => 
        acc + Math.pow(val - signal[i], 2), 0) / n;
    const filteredVar = filtered.reduce((acc, val, i) => 
        acc + Math.pow(val - signal[i], 2), 0) / n;

    return {
        time: t,
        signal: signal,
        noisy: noisy,
        filtered: filtered,
        noisyVar,
        filteredVar
    };
}

function updateFilter() {
    const params = {
        F: parseFloat(document.getElementById('F').value),
        H: parseFloat(document.getElementById('H').value),
        Q: parseFloat(document.getElementById('Q').value),
        R: parseFloat(document.getElementById('R').value),
        P: parseFloat(document.getElementById('P').value),
        X: parseFloat(document.getElementById('X').value),
        freq: parseFloat(document.getElementById('freq').value),
        amp: parseFloat(document.getElementById('amp').value),
        offset: parseFloat(document.getElementById('offset').value),
        time: parseFloat(document.getElementById('time').value),
        noise: parseFloat(document.getElementById('noise').value)
    };

    const data = generateSignal(params);

    // Оновлення графіку
    if (chart) {
        chart.destroy();
    }

    const ctx = document.getElementById('chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.time,
            datasets: [
                {
                    label: 'Оригінальний сигнал',
                    data: data.signal,
                    borderColor: 'blue',
                    borderWidth: 1,
                    pointRadius: 0
                },
                {
                    label: 'Зашумлений сигнал',
                    data: data.noisy,
                    borderColor: 'orange',
                    borderWidth: 1,
                    pointRadius: 0
                },
                {
                    label: 'Відфільтрований сигнал',
                    data: data.filtered,
                    borderColor: 'green',
                    borderWidth: 1,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false
        }
    });

    // Оновлення статистики
    document.getElementById('stats').innerHTML = `
        Дисперсія шуму: ${data.noisyVar.toFixed(2)}<br>
        Дисперсія після фільтрації: ${data.filteredVar.toFixed(2)}<br>
        Покращення: ${((1 - data.filteredVar/data.noisyVar) * 100).toFixed(2)}%
    `;
}

// Початкове оновлення
updateFilter();