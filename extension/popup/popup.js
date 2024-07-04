document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login-section');
    const analysisSection = document.getElementById('analysis-section');
    const loginForm = document.getElementById('login-form');
    const logoutButton = document.getElementById('logout-button');
    const loginMessage = document.getElementById('login-message');
    const analysisMessage = document.getElementById('analysis-message');

    const userToken = localStorage.getItem('userToken');
    if (userToken) {
        showAnalysisSection();
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Perform login request
        const response = await fetch('http://localhost:5172/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('userToken', data.token);
            showMessage(loginMessage, 'Login successful', 'success');
            showAnalysisSection();
        } else {
            showMessage(loginMessage, data.message, 'error');
        }
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('userToken');
        showMessage(analysisMessage, 'Logged out successfully', 'success');
        showLoginSection();
    });

    function showLoginSection() {
        loginSection.style.display = 'flex';
        analysisSection.style.display = 'none';
    }

    function showAnalysisSection() {
        loginSection.style.display = 'none';
        analysisSection.style.display = 'flex';
        loadActivityData();
    }

    async function loadActivityData() {
        const userToken = localStorage.getItem('userToken');
        const response = await fetch('http://localhost:5172/api/activities/today', {
            method: 'GET',
            headers: {
                'Authorization': `${userToken}`
            }
        });

        const data = await response.json();
        if (response.ok) {
            renderActivityData(data);
        } else {
            showMessage(analysisMessage, data.message, 'error');
        }
    }

    function renderActivityData(data) {
        console.log('Activity Data:', data);


        const chartContainer = document.getElementById('chart-container');
        const websiteTimes = document.getElementById('website-times');

        // Clear previous content
        chartContainer.innerHTML = '';
        websiteTimes.innerHTML = '';

        // Render chart (example using a basic pie chart library)
        const chartData = data.map(item => ({ label: item.website, value: item.totalTimeSpent, color: getRandomColor() }));
        const chart = new PieChart(chartContainer, chartData);
        chart.render();
        console.log(chartData);

        // Render website times
        chartData.forEach(item => {
            const websiteTime = document.createElement('div');
            websiteTime.style.padding = '0px';
            const timeDisplay = item.value < 3600 ? `${item.value / 60} mins` : `${(item.value / 3600).toFixed(2)} hrs`;
            websiteTime.innerHTML = `
            <div style="width:100%; display: flex; justify-content: space-between; align-items: center;">
            <span style="width:62%; color: ${item.color}; border:1px solid; padding:2px 5px; border-radius:3px">${item.label}</span>
            <span style="width:28%; color: ${item.color}; border:1px solid; padding:2px 5px; border-radius:3px">${timeDisplay}</span>
        </div>
        
`;
            websiteTimes.appendChild(websiteTime);
        });
    }

    function showMessage(element, message, type) {
        element.style.display = 'block';
        element.textContent = message;
        element.className = `message ${type}`;
        setTimeout(() => {
            element.style.display = 'none';
        }, 3000);
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    class PieChart {
        constructor(container, data) {
            this.container = container;
            this.data = data;
        }

        render() {
            const total = this.data.reduce((sum, item) => sum + item.value, 0);
            if (total === 0) {
                this.container.innerHTML = '<p>No data to display</p>';
                return;
            }

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            svg.setAttribute('viewBox', '-1 -1 2 2');

            let cumulativePercent = 0;

            this.data.forEach(item => {
                const [startX, startY] = this.getCoordinatesForPercent(cumulativePercent);
                cumulativePercent += item.value / total;
                const [endX, endY] = this.getCoordinatesForPercent(cumulativePercent);
                const largeArcFlag = item.value / total > 0.5 ? 1 : 0;
                const pathData = [
                    `M ${startX} ${startY}`,
                    `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                    `L 0 0`
                ].join(' ');

                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', pathData);
                path.setAttribute('fill', item.color);
                svg.appendChild(path);
            });

            // Add a central white circle with text for total time spent
            const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            centerCircle.setAttribute('cx', 0);
            centerCircle.setAttribute('cy', 0);
            centerCircle.setAttribute('r', 0.8); // Adjust radius as needed
            centerCircle.setAttribute('fill', '#fff'); // White background
            svg.appendChild(centerCircle);

            const totalTimeText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            totalTimeText.setAttribute('x', 0);
            totalTimeText.setAttribute('y', 0.05);
            totalTimeText.setAttribute('text-anchor', 'middle');
            totalTimeText.setAttribute('dominant-baseline', 'middle');
            totalTimeText.style.fontSize = '0.2px';
            totalTimeText.setAttribute('fill', '#000'); // Black text color
            totalTimeText.textContent = `${(total / 3600).toFixed(2)} hrs`; // Display total time spent
            svg.appendChild(totalTimeText);

            this.container.appendChild(svg);
        }

        getCoordinatesForPercent(percent) {
            const x = Math.cos(2 * Math.PI * percent);
            const y = Math.sin(2 * Math.PI * percent);
            return [x, y];
        }


    }


});
